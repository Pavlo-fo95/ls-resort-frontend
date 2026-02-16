import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";

export default function ReviewsPage() {
  return (
    <div className="page">
      <PageHero
        title="Відгуки"
        subtitle="Живі враження клієнтів і результати роботи."
        image="/hero/reviews.png"
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Відгуки</h1>
            <p className="pageLead">Живі враження клієнтів. (Далі підключимо реальні відгуки.)</p>
          </div>

          <div className="pageTop__actions">
            <Link className="btn btn--primary" to="/#reviews">
              На блок головної →
            </Link>
            <Link className="btn" to="/">
              ← Головна
            </Link>
          </div>
        </div>

        <section className="section">
          <h2>Скоро тут буде</h2>
          <ul className="list">
            <li>Список відгуків</li>
            <li>Фільтр (позитивні / нейтральні / інше)</li>
            <li>Кнопка “Залишити відгук”</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

