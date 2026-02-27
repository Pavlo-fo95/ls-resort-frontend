type Props = { open: boolean; onToggle: () => void; };

export default function StartFab({ open, onToggle }: Props) {
  return (
    <button
      className={`startFab ${open ? "isOpen" : ""}`}
      onClick={onToggle}
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      Почати
    </button>
  );
}