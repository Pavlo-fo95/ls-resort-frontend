import { useEffect } from "react";
import type { ProgramDetail } from "../data/programDetails";
import { viberLinks } from "../config/contacts";

type Props = {
  open: boolean;
  onClose: () => void;
  item: ProgramDetail | null;
};

export default function ProgramDrawer({ open, onClose, item }: Props) {
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

  const msg = encodeURIComponent(
    `Хочу записатися на програму: ${item.title}. Підкажіть, будь ласка, розклад/вільні місця.`
  );
  // если твоя viberLinks.group уже “viber://chat?...”, текст может не поддерживаться.
  // Тогда просто используй viberLinks.group без &text=msg.
  const viberUrl = `${viberLinks.group}&text=${msg}`;

  return (
    <div className={`drawerOverlay ${open ? "open" : ""}`} onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="drawer__header">
          <div className="drawer__headText">
            <div className="drawer__kicker">Програма</div>
            <h2 className="drawer__title">{item.title}</h2>
            <p className="drawer__subtitle">{item.subtitle}</p>
          </div>

          <button className="drawer__close" onClick={onClose} aria-label="Закрити">
            ✕
          </button>
        </div>

        <div className="drawer__chips">
          {item.tags.map((t) => (
            <span key={t} className="chip chip--soft">
              {t}
            </span>
          ))}
        </div>

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

        <div className="drawer__footer">
          <a className="btn btn--primary drawer__cta" href={viberUrl} target="_blank" rel="noreferrer">
            Почати
          </a>
          <button className="btn drawer__secondary" onClick={onClose}>
            Закрити
          </button>
        </div>
      </aside>
    </div>
  );
}