import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uk from "../i18n/uk.json";
import ru from "../i18n/ru.json";
import en from "../i18n/en.json";

const saved = localStorage.getItem("lang");

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uk: { translation: uk },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: saved || "uk",
    fallbackLng: "uk",
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => localStorage.setItem("lang", lng));

export default i18n;
