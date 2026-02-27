import { useTranslation } from "react-i18next";


export default function PhilosophyBlock() {
  const { t } = useTranslation();
  
  return (
    <section className="manifest">
      <p className="manifest__lead">
        <strong>{t("philosophy.brand")}</strong> — {t("philosophy.text")}
      </p>
      <p className="manifest__sub">{t("philosophy.sub")}</p>
    </section>
  );
}
