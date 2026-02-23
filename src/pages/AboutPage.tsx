import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import CallButton from "../components/ui/CallButton";
import { phones, viberLinks } from "../config/contacts";

export default function AboutPage() {
  return (
    <div className="page">
      <PageHero
        title="Про нас"
        subtitle="SwanS ∞ miraculous wing — простір відновлення тіла і нервової системи."
        image="/hero/yoga.jpg"
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Про нас</h1>
            <p className="pageLead">
              Тіло — це не просто оболонка, а складна система, що відображає наші емоції, стреси та радості. Йогатерапія — це не про гнучкість, а про глибоке розуміння себе, зцілення та
              відновлення. Ми віримо, що кожен може знайти свій шлях до гармонії та здоров’я через
              уважність до тіла та його потреб.
            </p>
          </div>
          <div className="section__actions">
            <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
              Запис у Viber
            </a>
            <CallButton phone={phones.iryna} className="btn" label="Call" />
          </div>
          <div className="pageTop__actions">
            <Link className="btn btn--primary" to="/#about">
              На блок головної →
            </Link>
          </div>
        </div>

        <section className="section">
          <h2>Наша ідея</h2>
          <p>
          Іноді життя просить не обережності, а сміливості — вийти з установленого порядку,
          перестати виправдовуватися чи віком чи минулим, перестати боятися програти
          і, зрештою, наважитися грати по-крупному.
          Адже найнебезпечніше — не ризик,
          а прожити все за інструкцією,
          так і не почувши, як серце тихо просить змін.
          </p>
        </section>

        <section className="section section--alt">
        <h2>Сертифікати та досвід</h2>
        <p className="muted">
          Професійне навчання та постійне вдосконалення практик.
        </p>

        <div className="certGrid">

          <a
            href="/certificates/iryna-sajes.png"
            target="_blank"
            rel="noreferrer"
            className="certCard"
          >
            <img src="/certificates/iryna-sajes.png" alt="Ірина Лебедь — SAJES Level 1" />
            <div className="certCard__caption">
              Ірина Лебедь — SAJES Method Level 1 (Facial Massage)
            </div>
          </a>

                    <a
            href="/certificates/serhii-sajes.png"
            target="_blank"
            rel="noreferrer"
            className="certCard"
          >
            <img src="/certificates/serhii-sajes.png" alt="Сергій Сокуренко — SAJES Level 2" />
            <div className="certCard__caption">
              Сергій Сокуренко — SAJES Method Level 2 (Facial Massage)
            </div>
          </a>
        </div>
      </section>
      </main>
    </div>
  );
}

