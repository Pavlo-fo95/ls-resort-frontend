export type SentimentKey = "positive" | "neutral" | "negative" | "other";

export const reviewLabel: Record<SentimentKey, string> = {
  positive: "Позитивний",
  neutral: "Нейтральний",
  negative: "Негативний",
  other: "Інше",
};

export function norm(v?: string | null) {
  return (v || "").toLowerCase().trim();
}

export function sentimentKey(s?: string | null): SentimentKey {
  const x = norm(s);
  if (x === "positive") return "positive";
  if (x === "neutral") return "neutral";
  if (x === "negative") return "negative";
  return "other";
}

export function sentimentClass(s?: string | null) {
  const k = sentimentKey(s);
  if (k === "positive") return "reviewCard--positive";
  if (k === "neutral") return "reviewCard--neutral";
  if (k === "negative") return "reviewCard--negative";
  return "";
}

export function starsText(rating: number) {
  const r = Math.max(1, Math.min(5, Number(rating || 5)));
  return "★".repeat(r) + "☆".repeat(5 - r);
}