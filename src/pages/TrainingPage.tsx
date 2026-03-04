import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import ProgramSheet from "../components/ProgramSheet";
import { programDetails } from "../data/programDetails";
import type { ProgramDetail } from "../data/programDetails";

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
    image: "/rehab/run.png",
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

type ProgramCard = { id: string; title: string; image: string; tag: string };

const programs: ProgramCard[] = [
  { id: "heart", title: "Здорове серце", image: "/programs/heart.jpg", tag: "дихання + м’яке кардіо" },
  { id: "back", title: "Здорова спина", image: "/programs/back.jpg", tag: "стабілізація + постава" },
  { id: "weight", title: "Легка вага", image: "/programs/weight.jpg", tag: "м’яка сила + регулярність" },
];

export default function TrainingPage() {
  const [programOpen, setProgramOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);

  // раскрытия
  const [aboutOpen, setAboutOpen] = useState(false);
  const [placesOpen, setPlacesOpen] = useState(false);

  const programMap = useMemo(() => new Map(programDetails.map((p) => [p.id, p])), []);

  const openProgram = (id: string) => {
    setSelectedProgram(programMap.get(id) ?? null);
    setProgramOpen(true);
  };

  // превью текста (чтоб не “простыня”)
  const aboutPreview = useMemo(() => {
    const lines = irynaTextUA.split("\n").filter(Boolean);
    return lines.slice(0, 10).join("\n");
  }, []);

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

          {/* Блок 1 — методика (текст) с раскрытием */}
          <section className="section">
            <div className="card" style={{ padding: 18 }}>
              <div className="card__head" style={{ marginBottom: 10 }}>
                <h2 style={{ margin: 0 }}>Що таке йогатерапія і як ми працюємо</h2>
                <span className="muted">без “через біль”, з опорою на анатомію</span>
              </div>

              <p className="muted" style={{ whiteSpace: "pre-line", margin: 0 }}>
                {aboutOpen ? irynaTextUA : aboutPreview}
              </p>

              <div className="section__actions" style={{ marginTop: 12, justifyContent: "flex-end" }}>
                <button className="btn" onClick={() => setAboutOpen((v) => !v)}>
                  {aboutOpen ? "Згорнути ↑" : "Розгорнути ↓"}
                </button>
              </div>
            </div>
          </section>

          {/* Локації / розклад — спрятать и раскрывать */}
          <section className="section">
            <div className="card" style={{ padding: 18 }}>
              <div className="card__head" style={{ marginBottom: 10 }}>
                <h2 style={{ margin: 0 }}>Локації та розклад</h2>
                <span className="muted">натисни — і відкриється список</span>
              </div>

              <p className="muted" style={{ marginTop: 6 }}>
                Тут адреси, час занять та короткий опис. Зручно: не “шахматка” одразу на всю сторінку 🙂
              </p>

              <div className="section__actions" style={{ marginTop: 12 }}>
                <button className="btn btn--primary" onClick={() => setPlacesOpen((v) => !v)}>
                  {placesOpen ? "Сховати розклад ↑" : "Показати розклад ↓"}
                </button>
                <a className="btn" href={viberLinks.group} target="_blank" rel="noreferrer">
                  Запис у Viber →
                </a>
                <Link className="btn" to="/schedule">
                  Розклад →
                </Link>
              </div>

              {placesOpen ? (
                <div style={{ marginTop: 14 }}>
                  <div className="trainingChess">
                    {places.map((place: Place, idx: number) => (
                      <article className={`trainingBlock ${idx % 2 ? "is-reverse" : ""}`} key={place.id}>
                        <div
                          className="trainingBlock__media"
                          style={{ backgroundImage: `url(${place.image || ""})` }}
                        >
                          <div className="trainingBlock__mediaOverlay" />
                        </div>

                        <div className="trainingBlock__content">
                          <h3 className="trainingBlock__title" style={{ marginTop: 0 }}>
                            {place.name}
                          </h3>
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
                </div>
              ) : null}
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

          {/* З якими запитами */}
          <section className="section">
            <div className="pageTop" style={{ marginBottom: 10 }}>
              <div>
                <h2 className="pageTitle" style={{ fontSize: 28 }}>
                  З якими запитами ми працюємо?
                </h2>
                <p className="pageLead">
                  Йогатерапія + м’яка сила + міофасціальний реліз — щоб тіло стало стійким, а не “терпіло”.
                </p>
              </div>
            </div>

            <div className="focusGrid">
              {focus.map((f) => (
                <article className="focusCard" key={f.num}>
                  <div className="focusCard__num">{f.num}</div>
                  <div className="focusCard__body">
                    <h3 className="focusCard__title">{f.title}</h3>
                    <ul className="focusList">
                      {f.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Програми */}
          <section className="section">
            <h2 style={{ marginBottom: 10 }}>Рекомендуємо звернути увагу на авторські програми</h2>

            <div className="programGrid">
              {programs.map((c) => (
                <article className="programCard" key={c.id}>
                  <div
                    className="programCard__img"
                    style={{ backgroundImage: `url(${c.image})` }}
                    aria-hidden="true"
                  />
                  <div className="programCard__foot">
                    <div className="programCard__title">{c.title}</div>
                    <div className="programCard__tag">{c.tag}</div>

                    <button className="linkBtn" onClick={() => openProgram(c.id)}>
                      Детальніше →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Онлайн */}
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

      <ProgramSheet open={programOpen} onClose={() => setProgramOpen(false)} item={selectedProgram} />
    </PageFrame>
  );
}