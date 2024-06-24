import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { defaultTranslationNamespace as reactTailwindFlowbiteComponentsNs } from "@howso/react-tailwind-flowbite-components";
import howsoReactTailwindFlowbiteComponentsEn from "@howso/react-tailwind-flowbite-components/lib/public/locales/react-tailwind-flowbite-components/en.json" with { type:
  "json" };
import { defaultTranslationNamespace } from "../src/hooks/useDefaultTranslation";
import howsoEngineReactDisplayComponentsEn from "../public/locales/howso-engine-react-display-components/en.json" with { type:
  "json" };

const ns = [reactTailwindFlowbiteComponentsNs, defaultTranslationNamespace];
const supportedLngs = ["en"];

export default i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: supportedLngs[0],
    ns,
    interpolation: { escapeValue: false },
    // react: { useSuspense: true },
    supportedLngs,
    resources: {
      en: {
        [reactTailwindFlowbiteComponentsNs]:
          howsoReactTailwindFlowbiteComponentsEn,
        [defaultTranslationNamespace]: howsoEngineReactDisplayComponentsEn,
      },
    },
  });
