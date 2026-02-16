import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";

export default function AboutPage() {
  return (
    <div className="page">
      <PageHero
        title="Про нас"
        subtitle="LS Resort Studio — простір відновлення тіла і нервової системи."
        image="/hero/yoga.jpg"
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Про нас</h1>
            <p className="pageLead">
              LS Resort Studio — простір відновлення тіла та нервової системи у ритмі міста.
            </p>
          </div>

          <div className="pageTop__actions">
            <Link className="btn btn--primary" to="/#about">
              На блок головної →
            </Link>
            <Link className="btn" to="/">
              ← Головна
            </Link>
          </div>
        </div>

        <section className="section">
          <h2>Наша ідея</h2>
          <p>
            Поєднуємо практики, які підтримують тіло та відчуття опори: масаж, роботу з тілом,
            йогатерапію та м’які рекомендації.
          </p>
        </section>

        <section className="section section--alt">
          <h2>Сертифікати та досвід</h2>
          <p className="muted">Додамо фото/скани сертифікатів і короткі біо (Ірина, Сергій).</p>
        </section>
      </main>
    </div>
  );
}

