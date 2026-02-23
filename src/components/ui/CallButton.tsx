
type Props = {
  phone?: string;
  className?: string;
  label?: string;
};

function normalizeTel(phone: string) {
  const p = String(phone || "").replace(/[^\d+]/g, "");
  if (!p) return "";
  return p.startsWith("+") ? p : `+${p}`;
}

export default function CallButton({
  phone,
  className = "btn",
  label = "Call",
}: Props) {
  const tel = normalizeTel(phone || "");
  if (!tel) return null; // если пусто — кнопки нет (важно для prod)
  return (
    <a className={className} href={`tel:${tel}`} aria-label={`Call ${tel}`}>
      {label}
    </a>
  );
}