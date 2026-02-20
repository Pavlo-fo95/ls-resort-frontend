import { Link } from "react-router-dom";
import { viberLinks } from "../config/contacts";
import PageHero from "../components/sections/PageHero";

const HERBS = [
  {
    id: "pyaterchatka",
    title: "Сбір «П’ятерчатка»",
    short: "Антипаразитарний і протизапальний мікс з насіння та спецій. Не потребує заварювання.",
    bullets: [
      "Підтримка травлення та мікрофлори",
      "Жовчогінний ефект",
      "Зручно: 0.5–1 ст.л. 3 рази/день",
    ],
    note: "Курс: 1–1.5 місяця. Перед їжею за 20–30 хв.",
  },
  {
    id: "karpatsky",
    title: "Сбір «Карпатський»",
    short: "Комплекс трав проти паразитів/інфекцій + відновлення слизової ШКТ. Легко гіркуватий — це ок 🙂",
    bullets: [
      "Протизапальний та очищаючий ефект",
      "М’який жовчогінний",
      "Подрібнений — без заварювання",
    ],
    note: "Підбір схеми прийому — у Viber.",
  },
];

export default function HerbsPage() {
  return (
    <div className="page">
      <PageHero
        title="Трави та рекомендації"
        subtitle="Авторські збори та прості поради для підтримки балансу."
        image="/hero/herbs.png"
        viberLink={viberLinks.group}
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Трави та рекомендації</h1>
            <p className="pageLead">Авторські збори власного приготування. Просто, зрозуміло, під ваш запит.</p>
          </div>

          <div className="pageTop__actions">
            <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
              Замовити у Viber
            </a>
            <Link className="btn" to="/#herbs">
              ← На головну
            </Link>
          </div>
        </div>

        <section className="section">
          <h2>Збори</h2>

          <div className="cardsGrid">
            {HERBS.map((h) => (
              <article className="serviceCard" key={h.id}>
                <h3 className="serviceCard__title">{h.title}</h3>
                <p className="serviceCard__text">{h.short}</p>

                <ul className="list">
                  {h.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <p className="serviceCard__note">{h.note}</p>

                <div className="section__actions">
                  <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
                    Замовити у Viber
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--alt">
          <h2>Як замовити</h2>
          <ol className="steps">
            <li>Напишіть у Viber: що саме цікавить (збір/підбір).</li>
            <li>Уточнимо деталі та порадимо варіант.</li>
            <li>Підтвердимо замовлення і спосіб отримання.</li>
          </ol>
          <div className="section__actions">
            <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
              Замовити у Viber
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
