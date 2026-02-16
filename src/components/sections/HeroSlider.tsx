import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Slide = { src: string; alt: string };

type Props = {
  slides?: Slide[];
  viberLink?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryHref?: string;
  secondaryText?: string;
  intervalMs?: number;
};

export default function HeroSlider({
  slides,
  viberLink = "https://viber.com",
  title = "Ми — шлях до відновлення",
  subtitle = "Курорт у місті — без далеких доріг",
  ctaText = "Записатися у Viber",
  secondaryHref = "#massage",
  secondaryText = "Дізнатись більше",
  intervalMs = 4500,
}: Props) {
  const { t } = useTranslation();

  const defaultSlides = useMemo<Slide[]>(
    () => [
      { src: "/hero/yoga.jpg", alt: "Йогатерапія" },
      { src: "/hero/face.jpg", alt: "Масаж" },
      { src: "/hero/visceral.jpg", alt: "Вісцеральні практики" },
    ],
    []
  );

  const list = useMemo(() => {
    const arr = (slides?.length ? slides : defaultSlides).filter(
      (s): s is Slide => Boolean(s?.src)
    );
    return arr;
  }, [slides, defaultSlides]);

  const [idx, setIdx] = useState(0);

  // “безопасный индекс” — если слайдов стало меньше, просто показываем 0-й
  const safeIdx = list.length ? Math.min(idx, list.length - 1) : 0;

  useEffect(() => {
    if (list.length <= 1) return;

    const timer = window.setInterval(() => {
      setIdx((v) => (v + 1) % list.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [list.length, intervalMs]);

  if (!list.length) return null;

  const uiTitle = t("hero.title", { defaultValue: title });
  const uiSubtitle = t("hero.subtitle", { defaultValue: subtitle });
  const uiCta = t("hero.cta", { defaultValue: ctaText });
  const uiSecondary = t("hero.secondary", { defaultValue: secondaryText });

  return (
    <section id="top" className="hero" aria-label="Головний банер">
      <div className="hero__slides" aria-hidden="true">
        {list.map((s, i) => (
          <div
            key={`${s.src}-${i}`}
            className={`hero__slide ${i === safeIdx ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${s.src})` }}
            role="img"
            aria-label={s.alt}
          />
        ))}
      </div>

      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">{uiTitle}</h1>
        <p className="hero__subtitle">{uiSubtitle}</p>

        <div className="hero__actions">
          <a
            className="btn btn--primary hero__cta"
            href={viberLink}
            target="_blank"
            rel="noreferrer"
          >
            {uiCta}
          </a>

          <a className="btn hero__secondary" href={secondaryHref}>
            {uiSecondary}
          </a>
        </div>

        <div className="hero__dots" aria-label="Перемикач слайдів">
          {list.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === safeIdx ? "dot--active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Слайд ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
