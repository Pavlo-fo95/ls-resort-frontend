import { Link } from "react-router-dom";
import { viberLinks } from "../config/contacts";
import PageHero from "../components/sections/PageHero";

export default function HerbsPage() {
  return (
    <div className="page">
      <PageHero
        title="Трави та харчування"
        subtitle="Авторські збори та рекомендації."
        image="/hero/herbs.png"
        viberLink={viberLinks.group}
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Трави та рекомендації</h1>
            <p className="pageLead">
              Авторські збори та прості поради для підтримки балансу в повсякденному житті.
            </p>
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
          <h2>Що тут буде</h2>
          <div className="miniGrid">
            <article className="miniCard">
              <h3>Авторські збори</h3>
              <p>Коротко і зрозуміло: склад, як заварювати, коли приймати.</p>
            </article>
            <article className="miniCard">
              <h3>Підбір під запит</h3>
              <p>Уточнюємо стан і підбираємо варіант під ваш ритм.</p>
            </article>
            <article className="miniCard">
              <h3>Зручне замовлення</h3>
              <p>Написали у Viber — узгодили — забрали/отримали.</p>
            </article>
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
