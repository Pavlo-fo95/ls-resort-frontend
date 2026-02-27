import { Link } from "react-router-dom";
import { viberLinks } from "../config/contacts";
import PageHero from "../components/sections/PageHero";
import PageFrame from "../components/PageFrame";

export default function MassagePage() {
  return (
    <PageFrame>
      <PageHero
        title="Масаж"
        subtitle="Терапевтичний, тайський та вісцеральні практики — м’яко, уважно, без поспіху."
        image="/hero/face.jpg"
        viberLink={viberLinks.iryna}
        secondaryTo="/#massage"
        secondaryText="← На головну"
      />
      <div className="page">      

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

         <section className="section">
          <h2>Напрямки масажу</h2>

          <div className="massageBlock">
            <img src="/massage/visceral.jpg" alt="Вісцеральний масаж" />
            <div>
              <h3>Вісцеральний масаж — основа відновлення</h3>
              <p>
                Шлунково-кишковий тракт — це не просто травлення. 
                Це біохімічна лабораторія організму, стан слизових, 
                кровообіг, лімфовідтік та гормональний баланс.
              </p>
              <p>
                Вісцеральний масаж — м’яка робота через черевну стінку, 
                що відновлює фізіологічне положення органів, 
                покращує кровообіг і лімфодренаж, 
                повертає органам рухливість і функцію.
              </p>
              <p>
                Коли починає працювати живіт — починає працювати все тіло.
              </p>
            </div>
          </div>

          <div className="massageBlock reverse">
            <img src="/massage/breast.jpg" alt="Масаж грудей" />
            <div>
              <h3>Масаж грудей</h3>
              <p>
                Робота із застійними процесами, нормалізація 
                крово- та лімфотоку, підтримка гормонального балансу.
              </p>
              <p>
                Допомагає зберігати тканини м’якими та функціональними, 
                знижує ризик запальних процесів.
              </p>
              <p className="muted">
                Важливо: при онкозахворюваннях масаж не проводиться.
              </p>
            </div>
          </div>

          <div className="massageBlock">
            <img src="/massage/thai.jpg" alt="Тайський масаж" />
            <div>
              <h3>Тайський масаж</h3>
              <p>
                Глибока робота з тканинами, усунення застоїв і спазмів, 
                мобілізація суглобів та витягнення.
              </p>
              <p>
                М’яка альтернатива агресивним мануальним технікам.
              </p>
              <p>
                Результат — легкість у тілі, зменшення стресу, 
                покращення роботи нервової системи.
              </p>
            </div>
          </div>

          <div className="massageBlock reverse">
            <img src="/massage/face.jpg" alt="Міофасціальний масаж обличчя" />
            <div>
              <h3>Міофасціальний масаж обличчя</h3>
              <p>
                Знімає м’язові спазми, покращує венозний та лімфатичний відтік,
                вирівнює тон обличчя та підвищує пружність шкіри.
              </p>
              <p>
                Особлива увага — ВНЩС, зоні вух і шиї.
              </p>
              <p>
                Ефект — свіжий вигляд, розслаблення та глибокий баланс.
              </p>
            </div>
          </div>

          <div className="massageBlock">
            <img src="/massage/fullbody.jpg" alt="Загальний масаж тіла" />
            <div>
              <h3>Загальний масаж тіла</h3>
              <p>
                Комплексна міофасціальна робота з усім тілом:
                живіт, груди, спина, шия, кінцівки та обличчя.
              </p>
              <p>
                Авторська методика відновлення шийного відділу,
                усунення тригерних зон та спазмів.
              </p>
              <p>
                Тривалість: 1,5–2 години глибокої роботи.
              </p>
            </div>
          </div>
        </section>
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
          </div>
        </section>
      </main>
    </div>
    </PageFrame>
  );
}
