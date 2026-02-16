import { useTranslation } from "react-i18next";


export default function PhilosophyBlock() {
  const { t } = useTranslation();
  return (
    <section className="manifest">
      <p>
        <strong>{t("philosophy.brand")}</strong> — {t("philosophy.text")}
      </p>
    </section>
  );
}
