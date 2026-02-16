import { Link } from "react-router-dom";
import { viberLinks } from "../config/contacts";
import PageHero from "../components/sections/PageHero";

export default function MassagePage() {
  return (
    <div className="page">
      <PageHero
        title="Масаж"
        subtitle="Терапевтичний, тайський та вісцеральні практики — м’яко, уважно, без поспіху."
        image="/hero/face.jpg"
        viberLink={viberLinks.iryna}
        secondaryTo="/#massage"
        secondaryText="← На головну"
      />

      <main className="container">
        <section className="section">
          <div className="section__actions" style={{ justifyContent: "flex-end" }}>
            <a className="btn btn--primary" href={viberLinks.iryna} target="_blank" rel="noreferrer">
              Запис у Viber
            </a>
            <Link className="btn" to="/#massage">
              ← На головну
            </Link>
          </div>

          <h2>Напрямки</h2>
          <div className="miniGrid">
            <article className="miniCard">
              <h3>Терапевтичний масаж</h3>
              <p>Для спини, шиї, загального відновлення та розслаблення.</p>
            </article>
            <article className="miniCard">
              <h3>Тайський масаж</h3>
              <p>Мобілізація, витягнення, відчуття легкості в тілі.</p>
            </article>
            <article className="miniCard">
              <h3>Вісцеральні практики</h3>
              <p>Делікатна робота з животом і диханням для балансу тіла.</p>
            </article>
          </div>
        </section>

        <section className="section section--alt">
          <h2>Як проходить сеанс</h2>
          <ol className="steps">
            <li>Коротке знайомство і запит: що турбує, які відчуття в тілі.</li>
            <li>Процес роботи (м’яко, з повагою до меж).</li>
            <li>Рекомендації після: вода/відпочинок/легкі рухи.</li>
          </ol>
        </section>

        <section className="section">
          <h2>Запис</h2>
          <p className="muted">
            Найшвидше — написати у Viber. Вкажіть: ім’я, запит, зручні дні/час.
          </p>
          <div className="section__actions">
            <a className="btn btn--primary" href={viberLinks.iryna} target="_blank" rel="noreferrer">
              Написати у Viber
            </a>
            <Link className="btn" to="/#massage">
              Дивитись блок на головній
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
