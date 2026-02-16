import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  overlayClassName?: string; // Додано проп для класу оверлея
};

export default function Modal({ open, onClose, title, children, overlayClassName }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (boxRef.current && !boxRef.current.contains(t)) onClose();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`modalOverlay ${overlayClassName ?? ""}`}>
      <div className="modal" ref={boxRef}>
        <div className="modal__head">
          <div className="modal__title">{title ?? "Почати"}</div>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
