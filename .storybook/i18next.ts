import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { defaultTranslationNamespace } from "../src/hooks/useDefaultTranslation";

const ns = [defaultTranslationNamespace];
const supportedLngs = ["en"];

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    //debug: true,
    lng: supportedLngs[0],
    fallbackLng: supportedLngs[0],
    defaultNS: ns[0],
    ns,
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
    supportedLngs,
    backend: {
      loadPath: "/locales/{{ns}}/{{lng}}.json",
    },
  });

export default i18n;
