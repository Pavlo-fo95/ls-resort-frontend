import { useEffect, useMemo, useState } from "react";
import { logout, authApi } from "../api/auth";
import { api } from "../api/client";
import type { UserPublic } from "../api/authTypes";
import type { ContactMessage } from "../api/types";
import { useNavigate } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import { reviewLabel, sentimentClass, sentimentKey, starsText } from "../components/ui/reviewsUi";
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

type PvMap = Record<string, number>;
type ChartItem = { name: string; value: number };
type ReviewMini = {
  id: number;
  author_name: string;
  rating: number;
  sentiment?: string | null;
  created_at: string;
  is_featured: boolean;
};

function readPV(): PvMap {
  try {
    return JSON.parse(localStorage.getItem("pv") || "{}") as PvMap;
  } catch {
    return {};
  }
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const [me, setMe] = useState<UserPublic | null>(null);
  const [users, setUsers] = useState<UserPublic[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<ReviewMini[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Адмінка | LebedI";

    authApi.me().then(setMe).catch(() => navigate("/auth"));

    Promise.all([
      api.get<UserPublic[]>("/api/admin/users"),
      api.get<ContactMessage[]>("/api/contact/all"),
      fetch(`${import.meta.env.VITE_API_URL || ""}/api/reviews?limit=5&only_published=true`).then((r) =>
        r.ok ? r.json() : Promise.reject(new Error("Reviews error"))
      ),
    ])
      .then(([usersData, contactsData, reviewsData]) => {
        setUsers(usersData);
        setContacts(contactsData);
        setReviews(reviewsData);
        setError("");
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Помилка завантаження адмінки");
      });
  }, [navigate]);

  const pvData = useMemo(() => {
    const pv = readPV();

    const items: ChartItem[] = Object.entries(pv)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const top = items.slice(0, 6);
    const rest = items.slice(6).reduce((sum, item) => sum + item.value, 0);

    if (rest > 0) top.push({ name: "Other", value: rest });

    return top.length ? top : [{ name: "Home", value: 1 }];
  }, []);

  const totalViews = pvData.reduce((sum, item) => sum + item.value, 0);

  const colors = [
    "#4166ff",
    "#ff6b6b",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#22c55e",
    "#0ea5e9",
  ];

  const unreadContacts = contacts.filter((c) => !c.is_read).length;
  const closedContacts = contacts.filter((c) => c.status === "closed").length;
  const spamContacts = contacts.filter((c) => c.status === "spam").length;
  const adminsCount = users.filter((u) => u.role === "admin").length;

  const onLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <PageFrame>
      <div className="container section">
        <div className="cab">
          <header className="cab__top">
            <div>
              <h1 className="cab__title">Адмінка</h1>
              <p className="cab__sub muted">
                Керування сайтом, зверненнями та базовою аналітикою.
              </p>
            </div>

            <div className="cab__actions">
              <span className="roleBadge roleBadge--coral">
                {me?.role ?? "admin"}
              </span>

              <button
                className="btn btn--ghost"
                type="button"
                onClick={() => navigate("/admin")}
              >
                Dashboard
              </button>

              <button
                className="btn btn--ghost"
                type="button"
                onClick={() => navigate("/admin/inbox")}
              >
                Inbox
              </button>

              <button
                className="btn btn--primary"
                type="button"
                onClick={onLogout}
              >
                Вийти
              </button>
            </div>
          </header>

          {error && <div className="cab__alert">{error}</div>}

          <div className="cab__grid">
            <section className="card">
              <div className="card__head">
                <h2>Огляд</h2>
                <span className="muted">сьогоднішній стан</span>
              </div>

              <div className="stats">
                <div className="stat">
                  <div className="stat__num">{users.length}</div>
                  <div className="stat__label">Користувачі</div>
                </div>
                <div className="stat">
                  <div className="stat__num">{adminsCount}</div>
                  <div className="stat__label">Адміни</div>
                </div>
                <div className="stat">
                  <div className="stat__num">{contacts.length}</div>
                  <div className="stat__label">Звернення</div>
                </div>
                <div className="stat">
                  <div className="stat__num">{unreadContacts}</div>
                  <div className="stat__label">Непрочитані</div>
                </div>
              </div>

              <div className="stats" style={{ marginTop: 12 }}>
                <div className="stat">
                  <div className="stat__num">{reviews.length}</div>
                  <div className="stat__label">Останні відгуки</div>
                </div>
                <div className="stat">
                  <div className="stat__num">{closedContacts}</div>
                  <div className="stat__label">Закриті</div>
                </div>
                <div className="stat">
                  <div className="stat__num">{spamContacts}</div>
                  <div className="stat__label">Spam</div>
                </div>
                <div className="stat">
                  <div className="stat__num">{totalViews}</div>
                  <div className="stat__label">Перегляди</div>
                </div>
              </div>
            </section>

            <section className="card">
              <div className="card__head">
                <h2>Останні звернення</h2>
                <span className="muted">Inbox preview</span>
              </div>

              {contacts.length === 0 ? (
                <p className="muted">Поки звернень немає.</p>
              ) : (
                <div className="cardsGrid" style={{ gridTemplateColumns: "1fr", gap: 10 }}>
                  {contacts.slice(0, 4).map((m) => (
                    <article key={m.id} className="reviewCard">
                      <div className="reviewCard__top">
                        <div className="reviewCard__name">
                          #{m.id} {m.name}
                        </div>
                        <div className="muted">{m.is_read ? "read" : "new"}</div>
                      </div>

                      <div className="reviewCard__meta">
                        <span className="tag">{m.status}</span>
                        {m.topic ? <span className="tag">{m.topic}</span> : null}
                      </div>

                      <p className="muted" style={{ marginTop: 8 }}>
                        {m.message.slice(0, 100)}
                        {m.message.length > 100 ? "..." : ""}
                      </p>
                    </article>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <button className="btn btn--ghost" onClick={() => navigate("/admin/inbox")}>
                  Відкрити Inbox
                </button>
              </div>
            </section>

            <section className="card">
              <div className="card__head">
                <h2>Останні відгуки</h2>
                <span className="muted">публічні</span>
              </div>

              {reviews.length === 0 ? (
                <p className="muted">Поки що немає опублікованих відгуків.</p>
              ) : (
                <div className="cardsGrid" style={{ gridTemplateColumns: "1fr", gap: 10 }}>
                  {reviews.map((r) => (
                    <article className={`reviewCard ${sentimentClass(r.sentiment)}`} key={r.id}>
                      <div className="reviewCard__top">
                        <div className="reviewCard__name">{r.author_name}</div>
                        <div className="reviewCard__rating">{starsText(r.rating)}</div>
                      </div>
                      <div className="reviewCard__meta">
                        <span className="tag">{reviewLabel[sentimentKey(r.sentiment)]}</span>
                        {r.is_featured ? <span className="tag tag--hot">featured</span> : null}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="card">
              <div className="card__head">
                <h2>Аналітика</h2>
                <span className="muted">MVP</span>
              </div>

              <div className="chartTitleRow">
                <strong>Перегляди сторінок</strong>
                <span className="chartLegendNote">Усього: {totalViews}</span>
              </div>

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
                    >
                      {pvData.map((_, i) => (
                        <Cell key={i} fill={colors[i % colors.length]} />
                      ))}
                    </Pie>
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chartWrap" style={{ height: 240, marginTop: 16 }}>
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

              <p className="muted" style={{ marginTop: 12 }}>
                Дані беруться з localStorage і потрібні поки що як тимчасова MVP-аналітика.
              </p>

              <button
                className="btn btn--ghost"
                type="button"
                onClick={() => {
                  localStorage.removeItem("pv");
                  window.location.reload();
                }}
                style={{ marginTop: 12 }}
              >
                Скинути аналітику
              </button>
            </section>
            
          </div>
        </div>
      </div>
    </PageFrame>
  );
}