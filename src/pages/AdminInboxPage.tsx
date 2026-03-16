import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import type { ContactMessage, ContactPatchIn } from "../api/types";
import { useNavigate } from "react-router-dom";
import PageFrame from "../components/PageFrame";

type FilterType = "all" | "new" | "closed" | "spam";

export default function AdminInboxPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>("all");
  const navigate = useNavigate();

  const load = () =>
    api
      .get<ContactMessage[]>("/api/contact/all")
      .then((data) => {
        setItems(data);
        setError("");
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unknown error");
      });

  useEffect(() => {
    load();
  }, []);

  const patch = (id: number, payload: ContactPatchIn) =>
    api.patch<ContactMessage>(`/api/contact/${id}`, payload).then(() => load());

  const unreadCount = items.filter((m) => !m.is_read).length;
  const closedCount = items.filter((m) => m.status === "closed").length;
  const spamCount = items.filter((m) => m.status === "spam").length;

  const filteredItems = useMemo(() => {
    if (filter === "new") return items.filter((m) => !m.is_read);
    if (filter === "closed") return items.filter((m) => m.status === "closed");
    if (filter === "spam") return items.filter((m) => m.status === "spam");
    return items;
  }, [items, filter]);

  return (
    <PageFrame>
      <div className="container section">
        <div className="cab">
          <header className="cab__top">
            <div>
              <h1 className="cab__title">Inbox</h1>
              <p className="cab__sub muted">Повідомлення із форми зворотного зв’язку.</p>
            </div>

            <div className="cab__actions">
              <button className="btn btn--ghost" onClick={() => navigate("/admin")}>
                Dashboard
              </button>
              <button className="btn btn--ghost" onClick={() => setFilter("all")}>
                Усі
              </button>
              <button className="btn btn--ghost" onClick={() => setFilter("new")}>
                Нові
              </button>
              <button className="btn btn--ghost" onClick={() => setFilter("closed")}>
                Closed
              </button>
              <button className="btn btn--ghost" onClick={() => setFilter("spam")}>
                Spam
              </button>
            </div>
          </header>

          {error && <div className="cab__alert">{error}</div>}

          <section className="card">
            <div className="stats">
              <div className="stat">
                <div className="stat__num">{items.length}</div>
                <div className="stat__label">Усього</div>
              </div>
              <div className="stat">
                <div className="stat__num">{unreadCount}</div>
                <div className="stat__label">Нові</div>
              </div>
              <div className="stat">
                <div className="stat__num">{closedCount}</div>
                <div className="stat__label">Closed</div>
              </div>
              <div className="stat">
                <div className="stat__num">{spamCount}</div>
                <div className="stat__label">Spam</div>
              </div>
            </div>
          </section>

          <div style={{ height: 16 }} />

          {filteredItems.length === 0 ? (
            <section className="card">
              <p className="muted">За цим фільтром поки нічого немає.</p>
            </section>
          ) : (
            <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
              {filteredItems.map((m) => (
                <li key={m.id} className="card">
                  <div className="card__head">
                    <h2>
                      #{m.id} {m.name} {m.is_read ? "✓" : "•"}
                    </h2>
                    <span className="muted">{new Date(m.created_at).toLocaleString()}</span>
                  </div>

                  <div className="reviewCard__meta" style={{ marginBottom: 8 }}>
                    <span className="tag">{m.status}</span>
                    {m.topic ? <span className="tag">{m.topic}</span> : null}
                    {m.phone ? <span className="tag">{m.phone}</span> : null}
                    {m.email ? <span className="tag">{m.email}</span> : null}
                  </div>

                  <p style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{m.message}</p>

                  <div className="card__foot">
                    <button className="btn btn--ghost" onClick={() => patch(m.id, { is_read: true })}>
                      Read
                    </button>
                    <button className="btn btn--ghost" onClick={() => patch(m.id, { status: "closed" })}>
                      Close
                    </button>
                    <button className="btn btn--ghost" onClick={() => patch(m.id, { status: "spam" })}>
                      Spam
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageFrame>
  );
}