import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../public/locales/en/translations.json";
import tr from "../public/locales/tr/translations.json";

const resources = {
  en: {
    translation: en
  },
  tr: {
    translation: tr
  }
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false
  },
  resources
});

export default i18n;