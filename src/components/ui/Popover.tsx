import { useEffect, useRef } from "react";

export type AnchorRect = {
  top: number;
  left: number;
  bottom: number;
  width: number;
  height: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  anchorRect: AnchorRect | null;
  children: React.ReactNode;
};

export default function Popover({ open, onClose, anchorRect, children }: Props) {
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      const p = popRef.current;
      if (!p) return;
      if (p.contains(t)) return;
      onClose();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open, onClose]);

  if (!open || !anchorRect) return null;

  const top = anchorRect.bottom + 10;
  const left = Math.max(12, anchorRect.left - 140);

  return (
    <div
      ref={popRef}
      className="mega"
      style={{ position: "fixed", top, left, zIndex: 20000 }}
      role="dialog"
    >
      {children}
    </div>
  );
}
