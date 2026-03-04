import { useEffect } from "react";
import type { ProgramDetail } from "../data/programDetails";
import { viberLinks } from "../config/contacts";

type Props = {
  open: boolean;
  onClose: () => void;
  item: ProgramDetail | null;
};

export default function ProgramSheet({ open, onClose, item }: Props) {
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

  // Если твой viberLinks.group не поддерживает text — оставь просто viberLinks.group
  const viberUrl = `${viberLinks.group}&text=${msg}`;

  return (
    <div className={`sheetOverlay ${open ? "open" : ""}`} onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="sheet__grab" aria-hidden />

        <div className="sheet__header">
          <div>
            <div className="sheet__kicker">Програма</div>
            <div className="sheet__title">{item.title}</div>
            <div className="sheet__subtitle">{item.subtitle}</div>
          </div>

          <button className="sheet__close" onClick={onClose} aria-label="Закрити">
            ✕
          </button>
        </div>

        <div className="sheet__chips">
          {item.tags.map((t) => (
            <span key={t} className="chip chip--soft">
              {t}
            </span>
          ))}
        </div>

        <div className="sheet__content">
          {item.importantTitle && (
            <div className="sheet__info">
              <div className="sheet__infoTitle">🌿 {item.importantTitle}</div>
              <ul className="sheet__list">
                {(item.importantBullets ?? []).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {item.sections.map((s) => (
            <section key={s.title} className="sheet__section">
              <h3 className="sheet__h3">{s.title}</h3>
              {s.content.split("\n\n").map((p, i) => (
                <p key={i} className="sheet__p">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="sheet__footer">
          <a className="btn btn--primary" href={viberUrl} target="_blank" rel="noreferrer">
            Почати
          </a>
          <button className="btn" onClick={onClose}>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}