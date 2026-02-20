import { Link } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
import PageHero from "../components/sections/PageHero";

type FilterKey = "all" | "positive" | "neutral" | "negative" | "other";


type ReviewOut = {
  id: number;
  author_name: string;
  text: string;
  rating: number;
  sentiment?: string | null;
  status: string;
  is_featured: boolean;
  created_at: string;
};

const API = import.meta.env.VITE_API_URL || "";  

const label: Record<string, string> = {
  positive: "Позитивний",
  neutral: "Нейтральний",
  negative: "Негативний",
  other: "Інше",
};

const norm = (v?: string | null) => (v || "").toLowerCase().trim();

const sentimentClass = (s?: string | null) => {
  const x = norm(s);
  if (x === "positive") return "reviewCard--positive";
  if (x === "neutral") return "reviewCard--neutral";
  if (x === "negative") return "reviewCard--negative";
  return "";
};

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Невідома помилка";
}

function Stars({ rating }: { rating: number }) {
  const r = Math.max(1, Math.min(5, Number(rating || 5)));
  return <span aria-label={`rating ${r}`}>{"★".repeat(r)}{"☆".repeat(5 - r)}</span>;
}

export default function ReviewsPage() {
  const [items, setItems] = useState<ReviewOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // фильтр
  const [filter, setFilter] = useState<FilterKey>("all");
  const [showAll, setShowAll] = useState(false);  

  // форма
  const [openForm, setOpenForm] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = showAll
        ? `${API}/api/reviews/all`
        : `${API}/api/reviews?limit=100&only_published=true`;

      const res = await fetch(url);
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${t}`.trim());
      }

      const data = (await res.json()) as ReviewOut[];
      setItems(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Помилка завантаження");
    } finally {
      setLoading(false);
    }
  }, [showAll]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered: ReviewOut[] = useMemo(() => {
    const norm = (v?: string | null) => (v || "").toLowerCase().trim();

    if (filter === "all") return items;

    if (filter === "other") {
      return items.filter((x) => {
        const s = norm(x.sentiment);
        return !s || !["positive", "neutral", "negative"].includes(s);
      });
    }

    // positive / neutral / negative
    return items.filter((x) => norm(x.sentiment) === filter);
  }, [items, filter]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    setSentOk(null);

    const name = authorName.trim();
    const message = text.trim();
    const payload = { author_name: name, text: message, rating: Number(rating) };

    console.log("SEND REVIEW payload:", payload);

    if (!name || !message) return;

    try {
      setSending(true);

      const res = await fetch(`${API}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${t}`.trim());
      }

      setSentOk("Дякуємо! Відгук на модерації та з’явиться на сайті після перевірки.");
      setAuthorName("");
      setText("");
      setRating(5);
      setOpenForm(false);

      setFilter("all");
      await load();
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Помилка відправки");
    } finally {
      setSending(false);
    }
  }
  
  return (
    <div className="page">
      <PageHero
        title="Відгуки"
        subtitle="Живі враження клієнтів і результати роботи."
        image="/hero/reviews.png"
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Відгуки</h1>
            <p className="pageLead">Реальні історії та результати. Ваш відгук теж може бути тут ✨</p>
          </div>

          <div className="pageTop__actions">
            <button className="btn btn--primary" onClick={() => setOpenForm((v) => !v)}>
              Залишити відгук
            </button>
             <button className="btn" onClick={load} disabled={loading}>
                {loading ? "Оновлюємо…" : "Оновити"}
            </button>
            <Link className="btn" to="/#reviews">
              На блок головної →
            </Link>
            <Link className="btn" to="/">
              ← Головна
            </Link>
          </div>
        </div>

        {sentOk && (
          <section className="section section--alt">
            <p className="notice">{sentOk}</p>
          </section>
        )}

        <section className="section">
          {import.meta.env.DEV && (
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={showAll}
                  onChange={(e) => setShowAll(e.target.checked)}
                />
                Dev-режим: показати все
              </label>
              <span style={{ opacity: 0.7, fontSize: 13 }}>
                {showAll ? "Dev: показує всі статуси (published / pending / hidden)" : "Тільки published"}
              </span>
            </div>
          )}
          <div className="filters">
            <button className={`chip ${filter === "all" ? "chip--active" : ""}`} onClick={() => setFilter("all")}>Усі</button>
            <button className={`chip ${filter === "positive" ? "chip--active" : ""}`} onClick={() => setFilter("positive")}>Позитивні</button>
            <button className={`chip ${filter === "neutral" ? "chip--active" : ""}`} onClick={() => setFilter("neutral")}>Нейтральні</button>
            <button className={`chip ${filter === "negative" ? "chip--active" : ""}`} onClick={() => setFilter("negative")}>
              Негативні
            </button>
            <button className={`chip ${filter === "other" ? "chip--active" : ""}`} onClick={() => setFilter("other")}>
              Інше / без тега
            </button>
          </div>

          {loading && <p>Завантажуємо відгуки…</p>}
          {error && <p className="error">Помилка: {error}</p>}

          {!loading && !error && filtered.length === 0 && (
            <p>Поки що немає відгуків у цій категорії. Будь першим 😌</p>
          )}

          <div className="cardsGrid">
            {filtered.map((r) => (
              <article className={`reviewCard ${sentimentClass(r.sentiment)}`} key={r.id}>
                <div className="reviewCard__top">
                  <div className="reviewCard__name">{r.author_name}</div>
                  <div className="reviewCard__rating"><Stars rating={r.rating} /></div>
                </div>
                <p className="reviewCard__text">{r.text}</p>
                <div className="reviewCard__meta">
                  {r.sentiment ? <span className="tag">{label[r.sentiment] ?? r.sentiment}</span>: <span className="tag tag--muted">без тега</span>}
                  {r.is_featured ? <span className="tag tag--hot">featured</span> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {openForm && (
          <section className="section section--alt">
            <h2>Залишити відгук</h2>
           
            <form className="form" onSubmit={submitReview}>
              <div className="formRow">
                <label>Ім’я</label>
                <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Ваше ім’я" />
              
              </div>
              <div className="formRow">
                <label>Оцінка</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  <option value={5}>★★★★★ (5)</option>
                  <option value={4}>★★★★☆ (4)</option>
                  <option value={3}>★★★☆☆ (3)</option>
                  <option value={2}>★★☆☆☆ (2)</option>
                  <option value={1}>★☆☆☆☆ (1)</option>
                </select>
              </div>

              <div className="formRow">
                <label>Відгук</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Коротко: що відчули після сеансу / збору?"
                  rows={5}
                />
              </div>

              <div className="formActions">
                <button className="btn btn--primary" disabled={sending}>
                  {sending ? "Відправляємо…" : "Надіслати"}
                </button>
                <button type="button" className="btn" onClick={() => setOpenForm(false)}>
                  Скасувати
                </button>
              </div>

              <p className="hint">Відгуки публікуються після модерації (status: pending → published).</p>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
