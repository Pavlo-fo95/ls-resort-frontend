import { useTranslation } from "react-i18next";

export default function PhilosophyBlock() {
  const { t } = useTranslation();

  return (
    <section className="philosophyDiagonal manifest">
      <div className="philosophyDiagonal__line" aria-hidden="true" />

      <div className="philosophyDiagonal__words">
        {t("philosophy.words")}
      </div>

      <div className="philosophyDiagonal__content">

        <h2 className="philosophyDiagonal__title">
          <span className="brandInline">
            Lebed<span className="brandAccent">I</span>
          </span>
          {" — "}
          {t("philosophy.title")}
        </h2>

        <p className="philosophyDiagonal__text">
          {t("philosophy.text")}
        </p>

        <p className="philosophyDiagonal__text">
          {t("philosophy.sub")}
        </p>

        <p className="philosophyDiagonal__text philosophyDiagonal__accent">
          {t("philosophy.accent")}
        </p>

      </div>
    </section>
  );
}
