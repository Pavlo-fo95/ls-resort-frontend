import { useEffect, useMemo, useState } from "react";
import { authApi, logout } from "../api/auth";
import type { UserPublic } from "../api/authTypes";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { reviewLabel, sentimentClass, sentimentKey, starsText } from "../components/ui/reviewsUi";
import PageFrame from "../components/PageFrame";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// ----------------------
// local analytics (MVP)
// ----------------------
type PvMap = Record<string, number>;

function readPV(): PvMap {
  try {
    return JSON.parse(localStorage.getItem("pv") || "{}") as PvMap;
  } catch {
    return {};
  }
}
function writePV(map: PvMap) {
  localStorage.setItem("pv", JSON.stringify(map));
}
function incPV(path: string) {
  const pv = readPV();
  pv[path] = (pv[path] || 0) + 1;
  writePV(pv);
}

function prettyRoute(path: string) {
  if (path === "/") return "Home";
  if (path.startsWith("/blog")) return "Blog";
  if (path.startsWith("/schedule")) return "Schedule";
  if (path.startsWith("/massage")) return "Massage";
  if (path.startsWith("/training")) return "Training";
  if (path.startsWith("/herbs")) return "Herbs";
  if (path.startsWith("/reviews")) return "Reviews";
  if (path.startsWith("/about")) return "About";
  if (path.startsWith("/cart")) return "Cart";
  if (path.startsWith("/account")) return "Account";
  if (path.startsWith("/auth")) return "Auth";
  return "Other";
}
const API = import.meta.env.VITE_API_URL || "";

type ChartItem = { name: string; value: number };
type ReviewMini = { id:number; author_name:string; rating:number; sentiment?:string|null; created_at:string; is_featured:boolean };

export default function AccountPage() {
  const [me, setMe] = useState<UserPublic | null>(null);
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [latestReviews, setLatestReviews] = useState<ReviewMini[]>([]);

  useEffect(() => {
    fetch(`${API}/api/reviews?limit=5&only_published=true`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setLatestReviews)
      .catch(() => setLatestReviews([]));
  }, []);

  // track pageviews
  useEffect(() => {
    incPV(prettyRoute(location.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load me
  useEffect(() => {
    authApi
      .me()
      .then((u) => {
        setMe(u);
        localStorage.setItem("role", u.role);
      })
      .catch((e: unknown) => {
        setErr(e instanceof Error ? e.message : "Помилка профілю");
      });
  }, []);

  const onLogout = () => {
    logout();
    // чтобы UI точно обновился (хедер/guards)
    window.location.href = "/";
  };

  const roleLabel = me?.role === "admin" ? t("account.admin") : t("account.client");
  const roleClass =
    me?.role === "admin" ? "roleBadge roleBadge--coral" : "roleBadge roleBadge--blue";

  // chart data
const pvData = useMemo(() => {
  const pv = readPV();
  const items: ChartItem[] = Object.entries(pv)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const top = items.slice(0, 6);
  const rest = items.slice(6).reduce((s, x) => s + x.value, 0);
  if (rest > 0) top.push({ name: "Other", value: rest });

  return top.length ? top : [{ name: "Home", value: 1 }];
}, []); 

  const totalViews = pvData.reduce((s, x) => s + x.value, 0);

  // цвета: НЕ хардкодим палитру глобально, но для chart нужно задать массив.
  // Берём аккуратный набор (в админках так и делают).
  const pieColors = theme === "dark"
    ? ["#5b7cfa", "#ff6b6b", "#34d399", "#fbbf24", "#a78bfa", "#22c55e", "#60a5fa"]
    : ["#4166ff", "#ff6b6b", "#10b981", "#f59e0b", "#8b5cf6", "#22c55e", "#0ea5e9"];

  // mock KPI (потом заменишь на API)
  const kpi = {
    bookings: 0,
    requests: 0,
    subscription: "—",
  };

  return (
   <PageFrame>  
    <div className="container section">
      <div className="cab">
        <header className="cab__top">
          <div>
            <h1 className="cab__title">{t("account.title")}</h1>
            <p className="cab__sub muted">{t("account.subtitle")}</p>
          </div>

          <div className="cab__actions">
            {me && <span className={roleClass}>{roleLabel}</span>}

            <button className="btn btn--ghost" type="button" onClick={toggleTheme}>
              {theme === "dark" ? "Світла тема" : "Темна тема"}
            </button>

            <button className="btn btn--ghost" type="button" onClick={() => navigate("/")}>
              {t("account.home")}
            </button>

            <button className="btn btn--primary" type="button" onClick={onLogout}>
              {t("account.logout")}
            </button>
          </div>
        </header>

        {err && <div className="cab__alert">{err}</div>}

        <div className="cab__grid">
          {/* PROFILE */}
          <section className="card">
            <div className="card__head">
              <h2>{t("account.profile")}</h2>
              <span className="muted">LebedI</span>
            </div>

            <div className="profile">
              <div className="avatar" aria-hidden="true">
                {(me?.email?.[0] || "L").toUpperCase()}
              </div>

              <div className="profile__meta">
                <div className="profile__row">
                  <span className="label">{t("account.email")}</span>
                  <span className="value">{me?.email ?? "—"}</span>
                </div>

                <div className="profile__row">
                  <span className="label">{t("account.phone")}</span>
                  <span className="value">{me?.phone ?? "—"}</span>
                </div>

                <div className="profile__row">
                  <span className="label">{t("account.id")}</span>
                  <span className="value">#{me?.id ?? "—"}</span>
                </div>
              </div>
            </div>

            <div className="card__foot">
              <button className="btn btn--primary" onClick={() => navigate("/about#contacts")}>
                {t("account.writeToStudio")}
              </button>

              <button className="btn btn--ghost" onClick={() => navigate("/cart")}>
                {t("account.subscriptions")}
              </button>

              {me?.role === "admin" && (
                <button className="btn btn--ghost" onClick={() => navigate("/admin/inbox")}>
                  {t("account.adminInbox")}
                </button>
              )}
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="card">
            <div className="card__head">
              <h2>{t("account.quickActions")}</h2>
              <span className="muted">{t("account.noFinePrint")}</span>
            </div>

            <div className="quick">
              <button className="quick__item" onClick={() => navigate("/massage")}>
                <div className="quick__icon">💆</div>
                <div>
                  <div className="quick__title">{t("account.qaMassage")}</div>
                  <div className="muted">{t("account.qaMassageHint")}</div>
                </div>
              </button>

              <button className="quick__item" onClick={() => navigate("/training")}>
                <div className="quick__icon">🧘</div>
                <div>
                  <div className="quick__title">{t("account.qaTraining")}</div>
                  <div className="muted">{t("account.qaTrainingHint")}</div>
                </div>
              </button>

              <button className="quick__item" onClick={() => navigate("/herbs")}>
                <div className="quick__icon">🌿</div>
                <div>
                  <div className="quick__title">{t("account.qaHerbs")}</div>
                  <div className="muted">{t("account.qaHerbsHint")}</div>
                </div>
              </button>

              <button className="quick__item" onClick={() => navigate("/cart")}>
                <div className="quick__icon">🧾</div>
                <div>
                  <div className="quick__title">{t("account.subscriptions")}</div>
                  <div className="muted">{t("account.choosePlan")}</div>
                </div>
              </button>
            </div>
          </section>

          <section className="card">
            <div className="card__head">
              <h2>Останні відгуки</h2>
              <span className="muted">публічні</span>
            </div>

            {latestReviews.length === 0 ? (
              <p className="muted">Поки що немає опублікованих відгуків.</p>
            ) : (
              <div className="cardsGrid" style={{ gridTemplateColumns: "1fr", gap: 10 }}>
                {latestReviews.map((r) => (
                  <article className={`reviewCard ${sentimentClass(r.sentiment)}`} key={r.id}>
                    <div className="reviewCard__top">
                      <div className="reviewCard__name">{r.author_name}</div>
                      <div className="reviewCard__rating" aria-label={`rating ${r.rating}`}>
                        {starsText(r.rating)}
                      </div>
                    </div>
                    <div className="reviewCard__meta">
                      <span className="tag">
                        {reviewLabel[sentimentKey(r.sentiment)]}
                      </span>
                      {r.is_featured ? <span className="tag tag--hot">featured</span> : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* STATUS + CHARTS */}
          <section className="card">
            <div className="card__head">
              <h2>{t("account.status")}</h2>
              <span className="muted">{t("account.mvpBlock")}</span>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat__num">{kpi.bookings}</div>
                <div className="stat__label">{t("account.bookings")}</div>
              </div>
              <div className="stat">
                <div className="stat__num">{kpi.requests}</div>
                <div className="stat__label">{t("account.requests")}</div>
              </div>
              <div className="stat">
                <div className="stat__num">{kpi.subscription}</div>
                <div className="stat__label">{t("account.subscription")}</div>
              </div>
            </div>

            {/* Charts */}
            <div style={{ marginTop: 16 }}>
              <div className="chartTitleRow">
                <strong>{t("account.analyticsTitle")}</strong>
                <span className="chartLegendNote">
                  {t("account.totalViews")}: {totalViews}
                </span>
              </div>

              {/* Donut */}
              <div className="chartWrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pvData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="60%"
                      outerRadius="85%"
                      paddingAngle={2}
                      isAnimationActive
                    >
                      {pvData.map((_, i) => (
                        <Cell key={i} fill={pieColors[i % pieColors.length]} />
                      ))}
                    </Pie>
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bars */}
              <div style={{ marginTop: 16 }}>
                <div className="chartTitleRow">
                  <strong>{t("account.analyticsByPage")}</strong>
                  <span className="chartLegendNote">{t("account.fromLocalStorage")}</span>
                </div>

                <div className="chartWrap" style={{ height: 240 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pvData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <ReTooltip />
                      <Bar dataKey="value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <p className="muted" style={{ marginTop: 10 }}>
                  {t("account.analyticsHint")}
                </p>

                <button
                  className="btn btn--ghost"
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("pv");
                    window.location.reload();
                  }}
                >
                  {t("account.resetAnalytics")}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
   </PageFrame>
  );
}
