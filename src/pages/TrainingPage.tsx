import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import CallButton from "../components/ui/CallButton";
import { phones, viberLinks } from "../config/contacts";
import PageFrame from "../components/PageFrame";

import { places, pricing, videoOfWeek, irynaTextUA } from "../data/trainingData";
import type { Place, Session } from "../data/trainingData";

type FocusItem = { num: string; title: string; points: string[]; image?: string };

const focus: FocusItem[] = [
  {
    num: "01",
    title: "Опорно-руховий апарат",
    points: [
      "Біль у спині та шиї",
      "Скутість грудного відділу",
      "Мобільність тазу та кульшових",
      "Постава, слабкі стабілізатори",
      "Зажими після сидячої роботи",
    ],
    image: "/rehab/run.png", // необязательно, можно убрать
  },
  {
    num: "02",
    title: "Кардіо-респіраторна система",
    points: [
      "Поверхневе дихання",
      "Вегето-судинні реакції на стрес",
      "Напруга діафрагми та грудної клітки",
      "Повернення витривалості м’яко",
    ],
    image: "/rehab/heart.png",
  },
  {
    num: "03",
    title: "Нервова система та відновлення",
    points: [
      "Хронічна втома, “перегорання”",
      "Тривожність, порушення сну",
      "Перенапруга та головні болі",
      "Заспокоїти тіло через рух",
    ],
    image: "/rehab/spine.png",
  },
];

type ProgramCard = { title: string; image: string; tag: string };

const programs: ProgramCard[] = [
  { title: "Здорове серце", image: "/programs/heart.jpg", tag: "дихання + рух" },
  { title: "Здорова спина", image: "/programs/back.jpg", tag: "стабілізація" },
  { title: "Легка вага", image: "/programs/weight.jpg", tag: "м’яка сила" },
];

export default function TrainingPage() {
  return (
    <PageFrame>
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

          {/* Блок 1 — текст Ірини */}
          <section className="section">
            <div className="card" style={{ padding: 18 }}>
              <div className="card__head" style={{ marginBottom: 10 }}>
                <h2 style={{ margin: 0 }}>Сила — це здоров’я</h2>
                <span className="muted">від Ірини</span>
              </div>

              <p className="muted" style={{ whiteSpace: "pre-line", margin: 0 }}>
                {irynaTextUA}
              </p>
            </div>
          </section>

          {/* Локації (шахматка) */}
          <section className="section">
            <div className="trainingChess">
              {places.map((place: Place, idx: number) => (
                <article
                  className={`trainingBlock ${idx % 2 ? "is-reverse" : ""}`}
                  key={place.id}
                >
                  <div
                    className="trainingBlock__media"
                    style={{ backgroundImage: `url(${place.image || ""})` }}
                  >
                    <div className="trainingBlock__mediaOverlay" />
                  </div>

                  <div className="trainingBlock__content">
                    <h2 className="trainingBlock__title">{place.name}</h2>
                    {place.subtitle ? <p className="trainingBlock__sub">{place.subtitle}</p> : null}

                    {place.bullets?.length ? (
                      <ul className="trainingList">
                        {place.bullets.map((x: string) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="trainingScheduleMini">
                      <div className="trainingScheduleMini__title">Час</div>
                      <div className="trainingScheduleMini__rows">
                        {place.sessions.map((s: Session, i: number) => (
                          <div className="trainingScheduleMini__row" key={`${place.id}-${i}`}>
                            <span className="dotTiny" aria-hidden />
                            <span>
                              {s.day} — {s.time}
                              {s.title ? <span className="muted"> • {s.title}</span> : null}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="muted" style={{ marginTop: 10 }}>
                      {place.address}
                      {place.note ? <span className="muted"> • {place.note}</span> : null}
                    </p>

                    <div className="section__actions" style={{ marginTop: 14 }}>
                      <a
                        className="btn btn--primary"
                        href={viberLinks.group}
                        target="_blank"
                        rel="noreferrer"
                      >
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

          {/* Відео тижня */}
          <section className="section">
            <div className="card" style={{ padding: 18 }}>
              <div className="card__head" style={{ marginBottom: 10 }}>
                <h2 style={{ margin: 0 }}>{videoOfWeek.title}</h2>
                <span className="muted">для дому, якщо не виходить офлайн</span>
              </div>

              <p className="muted" style={{ marginTop: 6 }}>
                Друзі, якщо не можете ходити на тренування через зайнятість, сором’язливість або
                фінанси — я регулярно викладаю нові відеоуроки на YouTube 💚🧡
              </p>

              <div
                style={{
                  marginTop: 12,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,.06)",
                  background: "#fff",
                }}
              >
                <iframe
                  width="100%"
                  height="420"
                  src={videoOfWeek.embed}
                  title="YouTube video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: "block", border: 0 }}
                />
              </div>

              <div className="section__actions" style={{ marginTop: 14 }}>
                <a className="btn btn--primary" href={videoOfWeek.url} target="_blank" rel="noreferrer">
                  Дивитися на YouTube →
                </a>
                <Link className="btn" to="/blog">
                  Блог →
                </Link>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="pageTop" style={{ marginBottom: 10 }}>
              <div>
                <h2 className="pageTitle" style={{ fontSize: 28 }}>З якими запитами ми працюємо?</h2>
                <p className="pageLead">
                  Йогатерапія + м’яка сила + міофасціальний реліз — щоб тіло стало стійким, а не “терпіло”.
                </p>
              </div>
            </div>
            <section className="section">
              <div className="card" style={{ padding: 20 }}>
                <div className="card__head">
                  <h2 style={{ margin: 0 }}>Спина — найслабша частина сучасного тіла</h2>
                  <span className="muted">чому біль не лікується таблетками</span>
                </div>

                <p className="muted" style={{ marginTop: 10 }}>
                  М’язи спини — найслабша частина тіла сучасної людини.
                  Ми сидимо більше, ніж рухаємось, і спина поступово «вимикається» з роботи.
                  Коли м’язи слабшають — вони перестають утримувати вісь тіла,
                  хребет втрачає стабільність, формуються асиметрії та сколіотичні зміни.
                </p>

                <p className="muted">
                  Слабка спина — це не про вік і не про діагноз.
                  Це про відсутність регулярної, правильної роботи м’язів,
                  які повинні утримувати голову, грудну клітку та таз.
                </p>

                <div className="section__actions" style={{ marginTop: 14 }}>
                  <Link className="btn btn--primary" to="/blog/spina-os">
                    Читати детально →
                  </Link>
                  <a
                    className="btn"
                    href="https://youtu.be/MLWC21WoBFo?si=49jTxaMOH9blWgHF"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Відеоурок →
                  </a>
                </div>
              </div>
            </section>
            <div className="focusGrid">
              {focus.map((f) => (
                <article className="focusCard" key={f.num}>
                  <div className="focusCard__num">{f.num}</div>
                  <div className="focusCard__body">
                    <h3 className="focusCard__title">{f.title}</h3>
                    <ul className="focusList">
                      {f.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="section">
            <h2 style={{ marginBottom: 10 }}>Рекомендуємо звернути увагу на авторські програми</h2>

            <div className="programGrid">
              {programs.map((c) => (
                <article className="programCard" key={c.title}>
                  <div
                    className="programCard__img"
                    style={{ backgroundImage: `url(${c.image})` }}
                    aria-hidden="true"
                  />
                  <div className="programCard__foot">
                    <div className="programCard__title">{c.title}</div>
                    <div className="programCard__tag">{c.tag}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="section">
            <div className="card" style={{ padding: 18 }}>
              <div className="card__head">
                <h2 style={{ margin: 0 }}>Не виходить офлайн? Я поруч онлайн</h2>
                <span className="muted">YouTube + блог</span>
              </div>

              <p className="muted" style={{ marginTop: 8 }}>
                Якщо зараз складно ходити на тренування — нічого страшного. Почни з домашніх практик.
                А в блозі я розбираю питання по тілу й здоров’ю простою мовою.
              </p>

              <div className="section__actions" style={{ marginTop: 12 }}>
                <a className="btn btn--primary" href={videoOfWeek.url} target="_blank" rel="noreferrer">
                  YouTube-канал →
                </a>
                <Link className="btn" to="/blog">
                  Блог →
                </Link>
                <a className="btn" href={viberLinks.group} target="_blank" rel="noreferrer">
                  Запис у Viber →
                </a>
              </div>
            </div>
          </section>
          {/* Вартість */}
          <section className="section section--alt">
            <h2>Вартість</h2>
            <p className="pageLead" style={{ marginTop: 6 }}>
              💰 Тренування — <b>{pricing.training}</b>
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
    </PageFrame>
  );
}