import { Link } from "react-router-dom";
import { viberLinks } from "../config/contacts";
import PageHero from "../components/sections/PageHero";

export default function TrainingPage() {
  return (
    <div className="page">
      <PageHero
        title="Йогатерапія та тренування"
        subtitle="Практики для тіла і нервової системи."
        image="/hero/yoga_therapy.jpg"
        viberLink={viberLinks.group}
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Йогатерапія та тренування</h1>
            <p className="pageLead">
              Практики для тіла й нервової системи: м’яко, стабільно, з відчутним результатом.
            </p>
          </div>

          <div className="pageTop__actions">
            <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
              Запис у Viber
            </a>
            <Link className="btn" to="/#training">
              ← На головну
            </Link>
          </div>
        </div>

        <section className="section">
          <h2>Формати</h2>
          <div className="miniGrid">
            <article className="miniCard">
              <h3>Індивідуально</h3>
              <p>Під ваш стан і цілі: спина, шия, мобільність, стрес.</p>
            </article>
            <article className="miniCard">
              <h3>Міні-група</h3>
              <p>Підтримуючий формат, коли важлива регулярність і атмосфера.</p>
            </article>
            <article className="miniCard">
              <h3>Дім / студія</h3>
              <p>Онлайн або офлайн — під ваш ритм і можливості.</p>
            </article>
          </div>
        </section>

        <section className="section section--alt">
          <h2>Кому підходить</h2>
          <ul className="list">
            <li>Коли є напруга, “затиснуте” тіло, сидяча робота.</li>
            <li>Коли нервова система перевантажена, хочеться стабільності.</li>
            <li>Коли потрібна м’яка, але регулярна практика.</li>
          </ul>
        </section>

        <section className="section">
          <h2>Запис</h2>
          <p className="muted">
            Напишіть у Viber: формат (індивідуально/група), зручні дні/час, ваш запит.
          </p>
          <div className="section__actions">
            <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
              Написати у Viber
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

