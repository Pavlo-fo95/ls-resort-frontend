import { Link } from "react-router-dom";
import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; };

export default function StartPanel({ open, onClose }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // (по желанию) блок скролла, когда открыто
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <div
        className={`startOverlay ${open ? "isOpen" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`startDrawer ${open ? "isOpen" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Почати"
        aria-hidden={!open}
      >
        <button className="startClose" onClick={onClose} aria-label="Закрити">✕</button>

        <h3 className="startTitle">Почати — оберіть напрям</h3>

        <nav className="startNav">
          <Link to="/about" className="startItem" onClick={onClose}>
            <div className="startItem__title">Про нас</div>
            <div className="startItem__sub">Підхід, студія, команда</div>
          </Link>

          <Link to="/massage" className="startItem" onClick={onClose}>
            <div className="startItem__title">Масаж</div>
            <div className="startItem__sub">Формати та запис</div>
          </Link>

          <Link to="/training" className="startItem" onClick={onClose}>
            <div className="startItem__title">Тренування</div>
            <div className="startItem__sub">Йогатерапія та рух</div>
          </Link>

          <Link to="/herbs" className="startItem" onClick={onClose}>
            <div className="startItem__title">Трави</div>
            <div className="startItem__sub">Збори та підбір</div>
          </Link>
        </nav>
      </aside>
    </>
  );
}