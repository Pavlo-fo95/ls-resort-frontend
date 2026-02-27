import { useMemo, useState } from "react";
import PageHero from "../components/sections/PageHero";
import { viberLinks } from "../config/contacts";
import { herbBlends } from "../data/herbBlends";
import type { HerbBlend } from "../data/herbBlends";
import PageFrame from "../components/PageFrame";

export default function HerbsPage() {
  const [active, setActive] = useState<HerbBlend | null>(null);

  const items = useMemo(() => herbBlends, []);

  return (
   <PageFrame>
    <div className="page">
      <PageHero
        title="Трави"
        subtitle="Авторські фітозбори — чисті склади, зрозумілі протоколи, м’яка підтримка."
        image="/hero/herbs.jpg"
        viberLink={viberLinks.iryna}
        secondaryTo="/#herbs"
        secondaryText="← На головну"
      />

      <main className="container">
        <section className="section">
          <div className="section__actions" style={{ justifyContent: "flex-end" }}>
            <a className="btn btn--primary" href={viberLinks.iryna} target="_blank" rel="noreferrer">
              Консультація у Viber
            </a>
          </div>

          <div className="herbsTop">
            <h2 className="herbsTitle">Фітозбори</h2>
            <p className="muted herbsLead">
              Підбір — індивідуальний. На сторінці — базові описи, щоб було зрозуміло “що для чого”.
            </p>
          </div>

          <div className="herbGrid">
            {items.map((b) => (
              <button
                key={b.slug}
                className="herbCard"
                type="button"
                onClick={() => setActive(b)}
              >
                <div className="herbCard__media">
                  <img className="herbCard__img" src={b.image} alt={b.title} loading="lazy" />
                  <div className="herbCard__badges">
                    {b.isAuthor && <span className="badgePill badgePill--hot">Авторський</span>}
                    {b.tags.slice(0, 2).map((t) => (
                      <span key={t} className="badgePill">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="herbCard__body">
                  <div className="herbCard__name">{b.title}</div>
                  <div className="herbCard__sub muted">{b.subtitle}</div>
                </div>

                <div className="herbCard__foot">
                  <span className="linkLike">Детальніше →</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="section chooseBlock">
          <div className="chooseBlock__box">
            <h3>🌿 Як обрати збір?</h3>

            <div className="chooseGrid">
              <div>
                <strong>🍃 Якщо є здуття, важкість, газоутворення</strong>
                <p className="muted">«П’ятерчатка» або «Гастронорм»</p>
              </div>

              <div>
                <strong>🍃 Якщо гастрит / печія / ерозивні стани, чутлива слизова</strong>
                <p className="muted">«Гастронорм»</p>
              </div>

              <div>
                <strong>🍃 Якщо є проблеми з жовчю, печінкою, спазми жовчних протоків</strong>
                <p className="muted">«Карпатський» + (за потреби) «Алфей»</p>
              </div>

              <div>
                <strong>🍃 Для глибшого очищення та підтримки травлення</strong>
                <p className="muted">«Алфей»</p>
              </div>

              <div>
                <strong>🍃 При інсулінорезистентності, коливаннях цукру, тязі до солодкого</strong>
                <p className="muted">«Галеча»</p>
              </div>
            </div>

            <div className="section__actions" style={{ marginTop: 16 }}>
              <a className="btn btn--primary" href={viberLinks.iryna} target="_blank" rel="noreferrer">
                Отримати персональну рекомендацію
              </a>
            </div>
          </div>
        </section>
        {/* Drawer / panel */}
        {active && (
          <div className="herbPanelWrap" role="dialog" aria-modal="true">
            <div className="herbPanelOverlay" onClick={() => setActive(null)} />
            <div className="herbPanel">
              <div className="herbPanel__head">
                <div>
                  <div className="herbPanel__title">{active.title}</div>
                  <div className="muted">{active.subtitle}</div>
                </div>
                <button className="iconBtn" onClick={() => setActive(null)} aria-label="Close">
                  ✕
                </button>
              </div>

              <div className="herbPanel__grid">
                <div className="herbPanel__media">
                  <img className="herbPanel__img" src={active.image} alt={active.title} />
                  <div className="herbPanel__tags">
                    {active.isAuthor && <span className="badgePill badgePill--hot">Авторський</span>}
                    {active.tags.map((t) => (
                      <span key={t} className="badgePill">{t}</span>
                    ))}
                  </div>
                </div>
                <section className="section introHerbs">
                  <h3>🌿 Важлива інформація</h3>
                  <div className="introHerbs__text">
                    <p>Подрібнені фітозбори мають значно більше переваг, ніж лише їх цільове призначення.</p>

                    <ul>
                      <li>Це чудове джерело клітковини, якої зазвичай бракує кишечнику. Велика кількість фруктів не гарантує достатньої норми клітковини, але може давати надлишок глюкози.</li>
                      <li>Подрібнені трави, корені, насіння та ягоди містять природну гіркоту, що стимулює скорочення жовчного міхура та покращує відтік жовчі — природна підтримка печінки.</li>
                      <li>Збори допомагають пригнічувати патогенну мікрофлору та підтримують корисну мікробіоту кишечника.</li>
                      <li>Гіркі трави стимулюють вироблення соляної кислоти та ферментів — природна підтримка шлунка.</li>
                      <li>Підшлункова залоза також позитивно реагує на гіркі рослинні компоненти.</li>
                      <li>У подрібненому вигляді збори мають виражені сорбційні властивості.</li>
                      <li>Оскільки збори не потребують обов’язкового заварювання окропом, значна частина вітамінів і мікроелементів зберігається.</li>
                    </ul>

                    <p>Наша родина регулярно приймає фітозбори у своєму раціоні, періодично їх міняємо. Дуже задоволені ефектом і насолоджуємось натуральністю цих природніх ліків та впевнена в їх якості. Кожен продукт ми тестуємо особисто перед тим, як запропонувати його вам.</p>
                  </div>
                </section>
                <div className="herbPanel__content">
                  <section className="miniBlock">
                    <h3>Дія</h3>
                    <ul className="bullets">
                      {active.effect.map((x) => <li key={x}>{x}</li>)}
                    </ul>
                  </section>

                  <section className="miniBlock">
                    <h3>Опис</h3>
                    {active.description.map((p, i) => (
                      <p key={i} className="muted" style={{ marginTop: i ? 10 : 0 }}>
                        {p}
                      </p>
                    ))}
                  </section>

                  <section className="miniBlock">
                    <h3>Склад</h3>
                    <div className="chips">
                      {active.ingredients.map((x) => <span key={x} className="chip">{x}</span>)}
                    </div>
                  </section>

                  <section className="miniBlock">
                    <h3>Як приймати</h3>
                    <ol className="steps">
                      {active.howToUse.map((x) => <li key={x}>{x}</li>)}
                    </ol>
                    {active.course ? <p className="muted" style={{ marginTop: 10 }}>{active.course}</p> : null}
                    {active.notes?.length ? (
                      <div className="noteBox">
                        {active.notes.map((n) => <div key={n}>• {n}</div>)}
                      </div>
                    ) : null}
                  </section>
                  <div className="section__actions" style={{ marginTop: 14 }}>
                    <a className="btn btn--primary" href={viberLinks.iryna} target="_blank" rel="noreferrer">
                      Підібрати збір у Viber
                    </a>
                    <button className="btn btn--ghost" onClick={() => setActive(null)} type="button">
                      Закрити
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </PageFrame>
  );
}