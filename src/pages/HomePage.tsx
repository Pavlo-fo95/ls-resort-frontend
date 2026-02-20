import { useEffect, useState } from "react";
import HeroSlider from "../components/sections/HeroSlider";
import PhilosophyBlock from "../components/sections/PhilosophyBlock";
import { Link } from "react-router-dom";
import { endpoints } from "../api/endpoints";
import type { ServicesResponse, ContactInfo } from "../api/types";
import { viberLinks } from "../config/contacts";
import ReviewsPreview from "../components/sections/ReviewsPreview";

export default function HomePage() {
  const [services, setServices] = useState<ServicesResponse | null>(null);
  
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const [svc, info] = await Promise.all([
          endpoints.getServices(),
          endpoints.getContactInfo(),
        ]);

        if (!alive) return;
        setServices(svc);
        setContact(info);
      } catch (e: unknown) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Помилка завантаження");
      }
    };

    run();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="page">
      <HeroSlider viberLink={viberLinks.group} />
      <PhilosophyBlock />
      <ReviewsPreview />
      <main className="container">
        {error && <div className="alert">{error}</div>}

        <section className="section">
          <h2>Масаж</h2>
          <p>{services ? services.massage.join(" • ") : "Завантаження..."}</p>
          <div className="section__actions">
            <Link className="btn btn--primary" to="/massage">Детальніше →</Link>
            <a
              className="btn"
              href={contact?.viber?.iryna || viberLinks.iryna}
              target="_blank"
              rel="noreferrer"
            >
              Запис у Viber
            </a>
          </div>
        </section>

        <section className="section section--alt">
          <h2>Тренування</h2>
          <p>{services ? services.training.join(" • ") : "Завантаження..."}</p>
          <div className="section__actions">
            <Link className="btn btn--primary" to="/training">Формати тренувань →</Link>
          </div>
        </section>

        <section className="section">
          <h2>Трави</h2>
          <p>{services ? services.herbs.join(" • ") : "Завантаження..."}</p>
          <div className="section__actions">
            <Link className="btn btn--primary" to="/herbs">Авторські збори →</Link>
            <a
              className="btn"
              href={contact?.viber?.group || viberLinks.group}
              target="_blank"
              rel="noreferrer"
            >
              Замовити у Viber
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
