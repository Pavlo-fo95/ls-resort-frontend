import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import CallButton from "../components/ui/CallButton";
import { phones, viberLinks } from "../config/contacts";

type Block = {
  title: string;
  subtitle: string;
  image: string;
  bullets: string[];
  scheduleLines: string[];
};

const blocks: Block[] = [
  {
    title: "БЦ «КОНТИНЕНТ» — міні-зал у центрі",
    subtitle: "Вечірні практики — після роботи, щоб тіло відпустило, а голова перестала шуміти.",
    image: "/training/continent.jpg",
    bullets: [
      "Фокус: спина/шия, мобільність, стабілізація, антистрес",
      "М’яка й точна робота з тілом + нервовою системою",
      "Підійде після сидячої роботи та перевантаження",
    ],
    scheduleLines: ["Понеділок — 18:00", "Середа — 18:30", "Субота — 14:00"],
  },
  {
    title: "КЛУБ ОМ — Троїцька",
    subtitle: "Денний слот у вівторок і практика в суботу. Зручно, якщо хочеш регулярність.",
    image: "/training/om-1.jpg",
    bullets: [
      "Формат: група / підтримуюча практика",
      "Добре заходить, якщо хочеш стабільний ритм",
      "Збірна робота: дихання + рух + баланс",
    ],
    scheduleLines: ["Вівторок — 12:15", "Субота — 14:00"],
  },
];

export default function TrainingPage() {
  return (
    <div className="page trainingPage">
      <PageHero
        title="Йогатерапія та тренування"
        subtitle="Два простори. Один фокус — тіло + нервова система."
        image="/hero/yoga_therapy.jpg"
        viberLink={viberLinks.group}
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Йогатерапія та тренування</h1>
            <p className="pageLead">
              М’яко, стабільно, з відчутним результатом. Без культу «через біль» — ми дорослі, нам
              таке не треба 😌
            </p>
          </div>

          <div className="pageTop__actions">
            <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
              Запис у Viber
            </a>
            <CallButton phone={phones.iryna} className="btn" label="Call" />
            <Link className="btn" to="/schedule">
              Розклад →
            </Link>
          </div>
        </div>

        <section className="section">
          <div className="trainingChess">
            {blocks.map((b, idx) => (
              <article className={`trainingBlock ${idx % 2 ? "is-reverse" : ""}`} key={b.title}>
                <div className="trainingBlock__media" style={{ backgroundImage: `url(${b.image})` }}>
                  <div className="trainingBlock__mediaOverlay" />
                </div>

                <div className="trainingBlock__content">
                  <h2 className="trainingBlock__title">{b.title}</h2>
                  <p className="trainingBlock__sub">{b.subtitle}</p>

                  <ul className="trainingList">
                    {b.bullets.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>

                  <div className="trainingScheduleMini">
                    <div className="trainingScheduleMini__title">Час</div>
                    <div className="trainingScheduleMini__rows">
                      {b.scheduleLines.map((x) => (
                        <div className="trainingScheduleMini__row" key={x}>
                          <span className="dotTiny" aria-hidden />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section__actions" style={{ marginTop: 14 }}>
                    <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
                      Запис у Viber
                    </a>
                    <Link className="btn" to="/schedule">
                      Розклад →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--alt">
          <h2>Вартість</h2>
          <p className="pageLead" style={{ marginTop: 6 }}>
            💰 Тренування — <b>250/300 грн</b>
          </p>
          <p className="muted">
            Напиши: локація (Континент/ОМ), зручний день/час, та коротко твій запит.
          </p>
          <div className="section__actions">
            <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
              Написати у Viber
            </a>
            <CallButton phone={phones.serhii} className="btn" label="Call" />
          </div>
        </section>
      </main>
    </div>
  );
}
