import { useEffect, useState } from "react";
import { authApi, logout } from "../api/auth";
import type { UserPublic } from "../api/types";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const [me, setMe] = useState<UserPublic | null>(null);
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    authApi.me()
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
    navigate("/");
  };

  const roleLabel = me?.role === "admin" ? "Адмін" : "Клієнт";
  const roleClass = me?.role === "admin" ? "badge badge--coral" : "badge badge--blue";

  return (
    <div className="container section">
      <div className="cab">
        <header className="cab__top">
          <div>
            <h1 className="cab__title">Кабінет</h1>
            <p className="cab__sub muted">Тут буде профіль, бронювання та історія звернень.</p>
          </div>

          <div className="cab__actions">
            {me && <span className={roleClass}>{roleLabel}</span>}
            <button className="btn btn--ghost" onClick={() => navigate("/")}>На головну</button>
            <button className="btn btn--primary" onClick={onLogout}>Вийти</button>
          </div>
        </header>

        {err && <div className="cab__alert">{err}</div>}

        <div className="cab__grid">
          <section className="card">
            <div className="card__head">
              <h2>Профіль</h2>
              <span className="muted">LS Resort Studio</span>
            </div>

            <div className="profile">
              <div className="avatar" aria-hidden="true">LS</div>

              <div className="profile__meta">
                <div className="profile__row">
                  <span className="label">Email</span>
                  <span className="value">{me?.email || "—"}</span>
                </div>
                <div className="profile__row">
                  <span className="label">Телефон</span>
                  <span className="value">{me?.phone || "—"}</span>
                </div>
                <div className="profile__row">
                  <span className="label">ID</span>
                  <span className="value">#{me?.id ?? "—"}</span>
                </div>
              </div>
            </div>

            <div className="card__foot">
              <button className="btn btn--primary" onClick={() => navigate("/about#contacts")}>
                Написати в студію
              </button>
              {me?.role === "admin" && (
                <button className="btn btn--ghost" onClick={() => navigate("/admin/inbox")}>
                  Адмін: Inbox
                </button>
              )}
            </div>
          </section>

          <section className="card">
            <div className="card__head">
              <h2>Швидкі дії</h2>
              <span className="muted">без дрібного шрифту 😌</span>
            </div>

            <div className="quick">
              <button className="quick__item" onClick={() => navigate("/massage")}>
                <div className="quick__icon">💆</div>
                <div>
                  <div className="quick__title">Масаж</div>
                  <div className="muted">обрати послугу</div>
                </div>
              </button>

              <button className="quick__item" onClick={() => navigate("/training")}>
                <div className="quick__icon">🧘</div>
                <div>
                  <div className="quick__title">Тренування</div>
                  <div className="muted">йога / терапія</div>
                </div>
              </button>

              <button className="quick__item" onClick={() => navigate("/herbs")}>
                <div className="quick__icon">🌿</div>
                <div>
                  <div className="quick__title">Трави</div>
                  <div className="muted">догляд і баланс</div>
                </div>
              </button>
            </div>
          </section>

          <section className="card">
            <div className="card__head">
              <h2>Статус</h2>
              <span className="muted">MVP-блок</span>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat__num">0</div>
                <div className="stat__label">Бронювань</div>
              </div>
              <div className="stat">
                <div className="stat__num">0</div>
                <div className="stat__label">Звернень</div>
              </div>
              <div className="stat">
                <div className="stat__num">—</div>
                <div className="stat__label">Абонемент</div>
              </div>
            </div>

            <div className="cab__hint muted">
              Далі підв’яжемо реальні дані з бекенду: бронювання, покупки трав, історію повідомлень.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
