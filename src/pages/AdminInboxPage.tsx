import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { ContactMessage, ContactPatchIn } from "../api/types";
import PageFrame from "../components/PageFrame";

export default function AdminInboxPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [error, setError] = useState<string>("");

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
    load(); // eslint плагин обычно не ругается на это, т.к. тут нет setState "синхронно"
  }, []);

  const patch = (id: number, payload: ContactPatchIn) =>
    api
      .patch<ContactMessage>(`/api/contact/${id}`, payload)
      .then(() => load());

  return (
   <PageFrame>
    <div className="container section">
      <h1>Admin Inbox</h1>
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
        {items.map((m) => (
          <li key={m.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <strong>
                #{m.id} {m.name} {m.is_read ? "✓" : "•"} [{m.status}]
              </strong>
              <small>{new Date(m.created_at).toLocaleString()}</small>
            </div>

            <div style={{ opacity: 0.8 }}>
              {m.phone}
              {m.email ? ` · ${m.email}` : ""}
              {m.topic ? ` · ${m.topic}` : ""}
            </div>

            <p style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{m.message}</p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => patch(m.id, { is_read: true })}>Read</button>
              <button onClick={() => patch(m.id, { status: "closed" })}>Close</button>
              <button onClick={() => patch(m.id, { status: "spam" })}>Spam</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
   </PageFrame>
  );
}
