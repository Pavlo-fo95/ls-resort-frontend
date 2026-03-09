import { useState } from "react";
import { Link } from "react-router-dom";

export default function FloatingCardsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`floatingCardsBtn ${open ? "floatingCardsBtn--open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Відкрити карти здоров'я"
      >
        Карти
      </button>

      {open && (
        <>
          <div className="floatingCardsOverlay" onClick={() => setOpen(false)} />

          <aside className="floatingCardsPanel">
            <div className="floatingCardsPanel__top">
              <p className="floatingCardsPanel__label">Інвестиція у здоров'я</p>

              <button
                type="button"
                className="floatingCardsPanel__close"
                onClick={() => setOpen(false)}
                aria-label="Закрити"
              >
                ×
              </button>
            </div>

            <h3 className="floatingCardsPanel__title">Карти та сеанси</h3>

            <div className="floatingCardsPanel__list">
              <Link to="/health-cards" className="floatingCardsItem" onClick={() => setOpen(false)}>
                <span>Карта здоров'я</span>
                <strong>5500 грн</strong>
              </Link>

              <Link to="/health-cards" className="floatingCardsItem" onClick={() => setOpen(false)}>
                <span>Карта відновлення</span>
                <strong>4500 грн</strong>
              </Link>

              <Link to="/health-cards" className="floatingCardsItem" onClick={() => setOpen(false)}>
                <span>Карта практики</span>
                <strong>2500 грн</strong>
              </Link>

              <Link to="/health-cards" className="floatingCardsItem" onClick={() => setOpen(false)}>
                <span>Індивідуальне заняття</span>
                <strong>1200 грн</strong>
              </Link>

              <Link to="/health-cards" className="floatingCardsItem" onClick={() => setOpen(false)}>
                <span>Загальне заняття</span>
                <strong>300 грн</strong>
              </Link>

              <Link to="/health-cards" className="floatingCardsItem" onClick={() => setOpen(false)}>
                <span>Масаж 1 година</span>
                <strong>від 1000 грн</strong>
              </Link>
            </div>

            <div className="floatingCardsPanel__actions">
              <Link
                to="/health-cards"
                className="floatingCardsAction"
                onClick={() => setOpen(false)}
              >
                Переглянути всі
              </Link>

              <Link
                to="/cart"
                className="floatingCardsAction floatingCardsAction--primary"
                onClick={() => setOpen(false)}
              >
                Кошик
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}