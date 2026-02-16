import { Link } from "react-router-dom";

type Props = {
  title: string;
  subtitle?: string;
  image: string; // "/hero/face.jpg"
  viberLink?: string;
  primaryText?: string;
  secondaryTo?: string;      // "/#massage"
  secondaryText?: string;    // "← На головну"
};

export default function PageHero({
  title,
  subtitle,
  image,
  viberLink,
  primaryText = "Запис у Viber",
  secondaryTo = "/",
  secondaryText = "← На головну",
}: Props) {
  return (
    <section className="hero hero--page" aria-label={title}>
      <div className="hero__slides" aria-hidden="true">
        <div
          className="hero__slide is-active"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}

        <div className="hero__actions">
          {viberLink ? (
            <a
              className="btn btn--primary hero__cta"
              href={viberLink}
              target="_blank"
              rel="noreferrer"
            >
              {primaryText}
            </a>
          ) : null}

          <Link className="btn hero__secondary" to={secondaryTo}>
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}
