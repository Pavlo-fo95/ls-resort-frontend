import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import CallButton from "../components/ui/CallButton";
import { phones, viberLinks } from "../config/contacts";
import PageFrame from "../components/PageFrame";

export default function AboutPage() {
  return (
    <PageFrame>
      <PageHero
        title="Про нас"
        subtitle="LebedI — простір відновлення тіла і нервової системи."
        image="/hero/yoga1.jpg"
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Про нас</h1>
            <p className="pageLead">
              Ми з @Сергієм Сокуренко практикуючі вісцерологи з великим досвідом.
              Але наша головна особливість не у кількості технік.
              Наша особливість у чесності.
              Усі методи, які ми рекомендуємо клієнтам, регулярно застосовуємо на собі.
              Усі протоколи харчування, відновлення, тілесної роботи прожиті нами особисто.
              Ми не передаємо знання «за книжкою». Ми передаємо те, що працює. 
              І при цьому важливо розуміти:
              вісцеральний масаж – це потужний інструмент.
              Але здоров'я неможливе без участі самої людини.
              Тому ми супроводжуємо процес відновлення:
              •	даємо рекомендації щодо харчування,
              •	способу життя,
              •	рухової активності,
              •	самомасажу та дихальним практикам.
              Це система.
              Це спільна робота.
              Це відповідальність та результат.
              Тому що справжнє здоров'я починається не з пігулок.
              Воно починається із живота.

              Тіло — це не просто оболонка, а складна система, що відображає наші емоції, стреси та радості.
              Йогатерапія — це не про гнучкість, а про глибоке розуміння себе, зцілення та відновлення.
              Ми віримо, що кожен може знайти свій шлях до гармонії та здоров’я через уважність до тіла та його потреб.
              
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
          <h2>Наші погляди</h2>
          <p>
            Іноді життя просить не обережності, а сміливості — вийти зі сталого порядку,
            перестати виправдовуватися чи віком чи вагою, перестати боятися програти
            і, зрештою, наважитися грати по-крупному.
            Адже найнебезпечніше — не ризик,
            а прожити все за інструкцією,
            так і не відчути, як серце тихо просить змін.
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
              href="/certificates/iryna-sert.png"
              target="_blank"
              rel="noreferrer"
              className="certCard"
            >
              <img src="/certificates/iryna-sert.png" alt="Ірина Лебедь — SAJES Level 1" />
              <div className="certCard__caption">
                Ірина Лебедь — Yoga Science and Research (Breathwork Therapist)
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
               <Link className="btn" to="/#massage">
              ← На головну
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}