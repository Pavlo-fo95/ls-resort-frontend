import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { viberLinks } from "../config/contacts";
import PageHero from "../components/sections/PageHero";
import PageFrame from "../components/PageFrame";

import MassageDrawer from "../components/MassageDrawer";
import { massageDetails } from "../data/massageDetails";

export default function MassagePage() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<null | (typeof massageDetails)[number]["id"]>(null);

  const selected = useMemo(
    () => massageDetails.find((x) => x.id === selectedId) ?? null,
    [selectedId]
  );

  const showDetails = (id: (typeof massageDetails)[number]["id"]) => {
    setSelectedId(id);
    setOpen(true);
  };

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

              {/* 1) VISERAL */}
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

                  <button className="linkBtn" onClick={() => showDetails("visceral")}>
                    Детальніше →
                  </button>
                </div>
              </div>

              {/* 2) BREAST */}
              <div className="massageBlock reverse">
                <img src="/massage/breast.jpg" alt="Масаж грудей" />
                <div>
                  <h3>Масаж грудей</h3>
                  <p>
                    Робота із застійними процесами, нормалізація
                    крово- та лімфотоку, підтримка гормонального балансу.
                  </p>
                  <p className="muted">
                    Важливо: при підозрі або підтверджених онкозахворюваннях масаж не проводиться.
                  </p>

                  <button className="linkBtn" onClick={() => showDetails("breast")}>
                    Детальніше →
                  </button>
                </div>
              </div>

              {/* 3) THAI */}
              <div className="massageBlock">
                <img src="/massage/thai.jpg" alt="Тайський масаж" />
                <div>
                  <h3>Тайський масаж</h3>
                  <p>
                    Глибока робота з тканинами, усунення застоїв і спазмів,
                    мобілізація суглобів та витягнення.
                  </p>
                  <p>М’яка альтернатива агресивним мануальним технікам.</p>

                  <button className="linkBtn" onClick={() => showDetails("thai")}>
                    Детальніше →
                  </button>
                </div>
              </div>

              {/* 4) FACE */}
              <div className="massageBlock reverse">
                <img src="/massage/face.jpg" alt="Міофасціальний масаж обличчя" />
                <div>
                  <h3>Міофасціальний масаж обличчя</h3>
                  <p>
                    Знімає м’язові спазми, покращує венозний та лімфатичний відтік,
                    вирівнює тон обличчя та підвищує пружність шкіри.
                  </p>

                  <button className="linkBtn" onClick={() => showDetails("face")}>
                    Детальніше →
                  </button>
                </div>
              </div>

              {/* 5) FULLBODY */}
              <div className="massageBlock">
                <img src="/massage/fullbody.jpg" alt="Загальний масаж тіла" />
                <div>
                  <h3>Загальний масаж тіла</h3>
                  <p>
                    Комплексна міофасціальна робота з усім тілом:
                    живіт, спина, шия, кінцівки та обличчя.
                  </p>
                  <p>Тривалість: 1,5–2 години глибокої роботи.</p>

                  <button className="linkBtn" onClick={() => showDetails("fullbody")}>
                    Детальніше →
                  </button>
                </div>
              </div>
            </section>
          </section>

          {/* ... твої секції “Як проходить”, “Запис” лишаються як є ... */}
        </main>
      </div>

      <MassageDrawer
        open={open}
        onClose={() => setOpen(false)}
        item={selected}
      />
    </PageFrame>
  );
}