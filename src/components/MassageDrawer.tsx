import { useEffect } from "react";
import type { MassageDetail } from "../data/massageDetails";
import { viberLinks } from "../config/contacts";

type Props = {
  open: boolean;
  onClose: () => void;
  item: MassageDetail | null;
};

export default function MassageDrawer({ open, onClose, item }: Props) {
  // lock body scroll + ESC close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!item) return null;

  return (
    <div className={`drawerOverlay ${open ? "open" : ""}`} onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} aria-modal="true" role="dialog">
        {/* header */}
        <div className="drawer__header">
          <div className="drawer__headText">
            <div className="drawer__kicker">Формат: індивідуально</div>
            <h2 className="drawer__title">{item.title}</h2>
            <p className="drawer__subtitle">{item.subtitle}</p>
          </div>

          <button className="drawer__close" onClick={onClose} aria-label="Закрити">
            ✕
          </button>
        </div>

        {/* tags */}
        <div className="drawer__chips">
          {item.tags.map((t) => (
            <span key={t} className="chip chip--soft">
              {t}
            </span>
          ))}
        </div>

        {/* content */}
        <div className="drawer__content">
          {item.importantTitle && (
            <div className="drawer__info">
              <div className="drawer__infoTitle">🌿 {item.importantTitle}</div>
              <ul className="drawer__list">
                {(item.importantBullets ?? []).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {item.sections.map((s) => (
            <section key={s.title} className="drawer__section">
              <h3 className="drawer__h3">{s.title}</h3>
              {s.content.split("\n\n").map((p, i) => (
                <p key={i} className="drawer__p">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* footer actions (как "Почати") */}
        <div className="drawer__footer">
          <a className="btn btn--primary drawer__cta" href={viberLinks.iryna} target="_blank" rel="noreferrer">
            Запис у Viber
          </a>
          <button className="btn drawer__secondary" onClick={onClose}>
            Закрити
          </button>
        </div>
      </aside>
    </div>
  );
}
