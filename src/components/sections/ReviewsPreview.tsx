import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type ReviewOut = {
  id: number;
  author_name: string;
  rating: number;
  sentiment?: string | null;
  is_featured: boolean;
  status: string;
  created_at: string;
};

const API = import.meta.env.VITE_API_URL || "";

function Stars({ rating }: { rating: number }) {
  const r = Math.max(1, Math.min(5, Number(rating || 5)));
  return <span aria-label={`rating ${r}`}>{"★".repeat(r)}{"☆".repeat(5 - r)}</span>;
}

const label: Record<string, string> = {
  positive: "Позитивний",
  neutral: "Нейтральний",
  negative: "Негативний",
  other: "Інше",
};

const norm = (v?: string | null) => (v || "").toLowerCase().trim();
const sentimentClass = (s?: string | null) => {
  const x = norm(s);
  if (x === "positive") return "reviewCard--positive";
  if (x === "neutral") return "reviewCard--neutral";
  if (x === "negative") return "reviewCard--negative";
  return "reviewCard--other";
};

export default function ReviewsPreview() {
  const [items, setItems] = useState<ReviewOut[]>([]);

  useEffect(() => {
    fetch(`${API}/api/reviews?limit=20&only_published=true`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("load failed"))))
      .then((data: ReviewOut[]) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const top3 = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return sorted.slice(0, 3);
  }, [items]);

  if (!top3.length) return null;

  return (
    <section className="reviewsPreview section section--alt" id="reviews">
      <div className="container">
        <div className="reviewsPreview__top">
          <div>
            <h2 className="reviewsPreview__title">Відгуки</h2>
            <p className="reviewsPreview__lead"> Повний опис на сторінці Відгуки 💫</p>
          </div>
          <Link className="btn btn--primary" to="/reviews">
            Читати всі →
          </Link>
        </div>

        <div className="reviewsPreview__grid">
          {top3.map((r) => (
            <article className={`reviewCard reviewCard--compact ${sentimentClass(r.sentiment)}`} key={r.id}>
              <div className="reviewCard__top">
                <div className="reviewCard__name">{r.author_name}</div>
                <div className="reviewCard__rating">
                  <Stars rating={r.rating} />
                </div>
              </div>

              <div className="reviewCard__meta">
                <span className="tag">
                  {label[norm(r.sentiment) || "other"] ?? (r.sentiment || "Інше")}
                </span>
                {r.is_featured ? <span className="tag tag--hot">featured</span> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}