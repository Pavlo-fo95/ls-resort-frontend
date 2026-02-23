import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../api/endpoints";
import type { SearchLogIn, SearchLogOut, SuggestItem, SuggestResponse } from "../api/types";
import { buildSearchIndex } from "../search/searchIndex";
import { createFuse, searchDocs } from "../search/searchEngine";

type Lang = "ua" | "ru";
type MaybeAxios<T> = T | { data: T };
type RecentItem = { q: string; ts: number };

const RECENT_KEY = "search_recent_v2";
const RECENT_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 дней
const RECENT_MAX = 8;

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function hasData<T>(v: unknown): v is { data: T } {
  return isObject(v) && "data" in v;
}

function pickData<T>(v: MaybeAxios<T>): T {
  return hasData<T>(v) ? v.data : v;
}

function normalize(s: string): string {
  return (s || "").trim().toLowerCase();
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text: string, q: string): React.ReactNode {
  const query = normalize(q);
  if (!query) return text;

  const words = query.split(/\s+/).filter(Boolean);
  if (!words.length) return text;

  const re = new RegExp(`(${words.map(escapeRegExp).join("|")})`, "ig");
  const parts = text.split(re);

  return (
    <>
      {parts.map((p, i) =>
        re.test(p) ? (
          <mark key={i} className="searchPopover__mark">
            {p}
          </mark>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </>
  );
}

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];

    const now = Date.now();
    const cleaned = parsed
      .filter(
        (x): x is RecentItem =>
          isObject(x) && typeof x.q === "string" && typeof x.ts === "number"
      )
      .filter((x) => now - x.ts < RECENT_TTL_MS)
      .slice(0, RECENT_MAX);

    localStorage.setItem(RECENT_KEY, JSON.stringify(cleaned));
    return cleaned.map((x) => x.q);
  } catch {
    return [];
  }
}

function pushRecent(q: string): void {
  const s = q.trim();
  if (!s) return;

  const now = Date.now();

  let prev: RecentItem[] = [];
  try {
    const prevRaw = localStorage.getItem(RECENT_KEY);
    const prevUnknown: unknown = prevRaw ? JSON.parse(prevRaw) : [];
    prev = Array.isArray(prevUnknown)
      ? prevUnknown.filter(
          (x): x is RecentItem =>
            isObject(x) && typeof x.q === "string" && typeof x.ts === "number"
        )
      : [];
  } catch {
    prev = [];
  }

  const next: RecentItem[] = [{ q: s, ts: now }, ...prev.filter((x) => x.q.toLowerCase() !== s.toLowerCase())].slice(
    0,
    RECENT_MAX
  );

  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

function clearRecent(): void {
  localStorage.removeItem(RECENT_KEY);
}

function getSessionId(): string {
  let id = localStorage.getItem("search_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("search_session", id);
  }
  return id;
}

// 1) вычищаем ?q=..., хвосты, двойные //
function prettyRoute(rawRoute: string): string {
  const [path] = (rawRoute || "").split("?");
  const clean = path.replace(/\/+$/, "");
  return clean || "/";
}

// 2) FIX: если что-то ведёт на несуществующий роут — мапим на реальный
function normalizeRoute(route: string): string {
  const r = route || "/";
  // 🔥 ТУТ твой главный фикс 404:
  // если в подсказках/индексе есть /recommendations — а страницы нет,
  // ведём на реальный раздел (например /herbs или /about или /blog).
  if (r.startsWith("/recommendations")) return "/herbs";
  return r;
}

function prettyCrumbs(route: string, badge?: string): string {
  const base = "Miraculous Wing";
  const p = prettyRoute(route);
  if (badge) return `${base} › ${badge} › ${p}`;
  return `${base} › ${p}`;
}

type Row =
  | { kind: "header"; title: string; rightAction?: "clear" }
  | { kind: "quick"; title: string } // недавнее/популярное → подставляет в инпут
  | { kind: "item"; item: SuggestItem; badge?: string; snippet?: string };

type Props = {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  /** если у тебя реально есть /search page */
  hasSearchPage?: boolean;
};

export default function SearchPopover({ open, onClose, lang, hasSearchPage = false }: Props) {
  const navigate = useNavigate();
  const popRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [q, setQ] = useState<string>("");
  const [data, setData] = useState<SuggestResponse | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // fulltext (Fuse)
  const fuse = useMemo(() => createFuse(buildSearchIndex()), []);
  const fulltextHits = useMemo(() => searchDocs(fuse, q, 10), [fuse, q]);

  // on open: refresh recent + focus
  useEffect(() => {
    if (!open) return;
    setRecent(loadRecent());
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  // outside click close
  useEffect(() => {
    if (!open) return;

    function onDown(e: MouseEvent) {
      const node = popRef.current;
      if (!node) return;
      if (!node.contains(e.target as Node)) onClose();
    }

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  // esc close
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // backend suggest debounce (можно оставить — но мы используем его как “trending/quick”)
  useEffect(() => {
    if (!open) return;

    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await endpoints.suggest(q, lang);
        const payload = pickData<SuggestResponse>(res);
        setData(payload);
      } catch (e) {
        console.error(e);
        setData(null);
      } finally {
        setLoading(false);
        setActiveIndex(-1);
      }
    }, 220);

    return () => clearTimeout(t);
  }, [open, q, lang]);

  const rows: Row[] = useMemo(() => {
    const out: Row[] = [];
    const hasQ = normalize(q).length > 0;

    const trending = data?.trending ?? [];
    const tFound = lang === "ua" ? "Знайдено на сайті" : "Найдено на сайте";
    const tRecent = lang === "ua" ? "Останні" : "Недавние";
    const tPopular = lang === "ua" ? "Популярне" : "Популярное";
    const tEmpty = lang === "ua" ? "Нічого не знайдено" : "Ничего не найдено";

    if (!hasQ) {
      if (recent.length) out.push({ kind: "header", title: tRecent, rightAction: "clear" });
      recent.forEach((rq) => out.push({ kind: "quick", title: rq }));

      // популярное тоже как quick (не навигация!)
      if (trending.length) out.push({ kind: "header", title: `🔥 ${tPopular}` });
      trending.slice(0, 6).forEach((t) => out.push({ kind: "quick", title: t.title }));

      return out.slice(0, 24);
    }

    // has query: show fulltext results
    if (fulltextHits.length) {
      out.push({ kind: "header", title: tFound });

      fulltextHits.forEach((h) => {
        const route = normalizeRoute(h.doc.route);

        out.push({
          kind: "item",
          item: {
            title: h.doc.title,
            route: hasSearchPage ? route : route, // навигация напрямую на страницу
            type: "page",
            score: 1 - h.score,
          },
          badge: h.doc.breadcrumbs ?? (h.doc.type === "blog" ? "Блог" : "Сторінка"),
          snippet: h.snippet,
        });
      });
    } else {
      out.push({ kind: "header", title: tEmpty });
    }

    return out.slice(0, 26);
  }, [data, q, lang, recent, fulltextHits, hasSearchPage]);

  const selectableIndexes = useMemo(() => {
    return rows
      .map((r, idx) => (r.kind === "item" || r.kind === "quick" ? idx : -1))
      .filter((x): x is number => x !== -1);
  }, [rows]);

  function move(dir: 1 | -1) {
    if (!selectableIndexes.length) return;
    const pos = selectableIndexes.indexOf(activeIndex);
    const nextPos = pos === -1 ? 0 : (pos + dir + selectableIndexes.length) % selectableIndexes.length;
    setActiveIndex(selectableIndexes[nextPos]);
  }

  async function logAndGo(routeRaw: string, titleForLog: string) {
    const route = normalizeRoute(routeRaw);

    const queryToLog = normalize(q) ? q : titleForLog;
    if (normalize(queryToLog)) {
      pushRecent(queryToLog);
      setRecent(loadRecent());
    }

    const payload: SearchLogIn = {
      query: queryToLog || "",
      lang,
      session_id: getSessionId(),
      chosen_route: route,
    };

    try {
      const res = await endpoints.logSearch(payload);
      const out = pickData<SearchLogOut>(res);
      void out;
    } catch (e) {
      // лог — не критично
      console.error(e);
    }

    onClose();
    setQ("");
    navigate(route);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = rows[activeIndex];
      if (!row) return;

      // quick: подставляем запрос и остаёмся в поповере
      if (row.kind === "quick") {
        setQ(row.title);
        setActiveIndex(-1);
        inputRef.current?.focus();
        return;
      }

      if (row.kind === "item") {
        void logAndGo(row.item.route, row.item.title);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  if (!open) return null;

  const showClearBtn = !normalize(q) && recent.length > 0;

  return (
    <div className="searchPopover searchPopover--pro" ref={popRef} role="dialog" aria-label="Search">
      <div className="searchPopover__row">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder={lang === "ua" ? "Пошук…" : "Поиск…"}
          className="searchInput"
          autoComplete="off"
        />
        <button className="iconBtn iconBtn--small" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="searchPopover__hint">
        {loading
          ? lang === "ua"
            ? "Шукаю…"
            : "Ищу…"
          : lang === "ua"
          ? "Наприклад: “масаж”, “біль у плечі”, “вправи”"
          : "Например: “массаж”, “боль в плече”, “упражнения”"}
      </div>

      <div className="searchPopover__list" role="listbox">
        {rows.map((r, idx) => {
          if (r.kind === "header") {
            return (
              <div key={`h-${idx}`} className="searchPopover__sectionRow">
                <div className="searchPopover__section">{r.title}</div>

                {r.rightAction === "clear" && showClearBtn && (
                  <button
                    type="button"
                    className="searchPopover__clear"
                    onClick={() => {
                      clearRecent();
                      setRecent([]);
                    }}
                  >
                    {lang === "ua" ? "Очистити історію" : "Очистить историю"}
                  </button>
                )}
              </div>
            );
          }

          const isActive = idx === activeIndex;

          // quick row
          if (r.kind === "quick") {
            return (
              <button
                key={`q-${idx}-${r.title}`}
                type="button"
                className={`searchPopover__item ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  setQ(r.title);
                  setActiveIndex(-1);
                  inputRef.current?.focus();
                }}
                role="option"
                aria-selected={isActive}
              >
                <div className="searchPopover__itemMain">
                  <div className="searchPopover__itemTitle">{highlight(r.title, q)}</div>
                  <div className="searchPopover__itemRoute">{lang === "ua" ? "Швидкий запит" : "Быстрый запрос"}</div>
                </div>
                <span className="searchPopover__badge">{lang === "ua" ? "Швидко" : "Быстро"}</span>
              </button>
            );
          }

          // item row
          const route = normalizeRoute(r.item.route);

          return (
            <button
              key={`i-${idx}-${route}`}
              type="button"
              className={`searchPopover__item ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => void logAndGo(route, r.item.title)}
              role="option"
              aria-selected={isActive}
            >
              <div className="searchPopover__itemMain">
                <div className="searchPopover__itemTitle">{highlight(r.item.title, q)}</div>

                <div className="searchPopover__itemRoute">{prettyCrumbs(route, r.badge)}</div>

                {r.snippet && <div className="searchPopover__snippet">{highlight(r.snippet, q)}</div>}
              </div>

              {r.badge && <span className="searchPopover__badge">{r.badge}</span>}
            </button>
          );
        })}
      </div>

      <div className="searchPopover__footer">
        <span className="searchPopover__kbd">↑↓</span> · <span className="searchPopover__kbd">Enter</span> ·{" "}
        <span className="searchPopover__kbd">Esc</span>
      </div>
    </div>
  );
}