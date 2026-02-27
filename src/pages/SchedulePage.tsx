import CallButton from "../components/ui/CallButton";
import PageHero from "../components/sections/PageHero";
import { phones, viberLinks } from "../config/contacts";
import PageFrame from "../components/PageFrame";

type Session = { day: string; time: string; title?: string; coach?: string };
type Place = {
  name: string;
  address: string;
  note?: string;
  sessions: Session[];
};

const places: Place[] = [
  {
    name: "КЛУБ ОМ (Дніпро)",
    address: "вул. Троїцька 15/3",
    note: "Тренер: Сергій Сокуренко",
    sessions: [
      { day: "ВТ", time: "12:15", title: "Йогатерапія / тренування", coach: "Сергій" },
      { day: "СБ", time: "14:00", title: "Йогатерапія / тренування", coach: "Сергій" },
    ],
  },
  {
    name: "БЦ «КОНТИНЕНТ»",
    address: "вул. Ніла Армстронга, 2D, 6 поверх, каб. 614",
    note: "Тренер: Ірина Лебедь",
    sessions: [
      { day: "ПН", time: "18:00", title: "Вечірня практика", coach: "Ірина" },
      { day: "СР", time: "18:30", title: "Вечірня практика", coach: "Ірина" },
      { day: "СБ", time: "14:00", title: "Групова практика", coach: "Ірина" },
    ],
  },
];

export default function SchedulePage() {
  return (
    <PageFrame>
    <div className="page schedulePage">
      <PageHero
        title="Розклад"
        subtitle="Дві локації, чіткий час, без зайвого шуму."
        image="/hero/schedule.png"
        viberLink={viberLinks.group}
      />

      <main className="container">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">Розклад тренувань</h1>
            <p className="pageLead">
              Обирай локацію — і пиши в Viber для запису. «Call» поки тестовий номер.
            </p>
          </div>

          <div className="pageTop__actions">
            <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
              Запис у Viber
            </a>
            <CallButton phone={phones.iryna} className="btn" label="Call" />
          </div>
        </div>

        <section className="section">
          <div className="scheduleGrid">
            {places.map((p) => (
              <article className="scheduleCard" key={p.name}>
                <div className="scheduleCard__head">
                  <div>
                    <h2 className="scheduleCard__title">{p.name}</h2>
                    <div className="scheduleCard__addr">{p.address}</div>
                  </div>
                  {p.note ? <div className="scheduleCard__note">{p.note}</div> : null}
                </div>

                <div className="scheduleRows">
                  {p.sessions.map((s, idx) => (
                    <div className="scheduleRow" key={`${p.name}-${idx}`}>
                      <b className="scheduleRow__day">{s.day}</b>
                      <span className="scheduleRow__time">{s.time}</span>
                      <span className="scheduleRow__title">
                        {s.title ?? "Тренування"}{" "}
                        {s.coach ? <span className="muted">({s.coach})</span> : null}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--alt">
          <div className="priceCard">
            <h2 className="priceCard__title">Вартість</h2>
            <p className="priceCard__lead">
              💰 Тренування — <b>250/300 грн</b>
            </p>
            <p className="muted">
              Якщо сумніваєшся, який формат підійде — напиши в Viber: запит + зручні дні/час.
            </p>

            <div className="section__actions">
              <a className="btn btn--primary" href={viberLinks.group} target="_blank" rel="noreferrer">
                Написати у Viber
              </a>
              <CallButton phone={phones.serhii} className="btn" label="Call" />
            </div>
          </div>
        </section>
      </main>
    </div>
    </PageFrame>
  );
}