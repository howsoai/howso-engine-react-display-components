import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { addI18nBundlesToResources } from "@howso/ui-internationalization-utils";
import { I18nBundles as ReactTailwindFlowbiteComponentsI18nBundles } from "@howso/react-tailwind-flowbite-components";
import { I18nBundles } from "../src";

const supportedLngs = ["en"];

export default i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: supportedLngs[0],
    interpolation: { escapeValue: false },
    // react: { useSuspense: true },
    supportedLngs,
    resources: addI18nBundlesToResources({}, [
      ...ReactTailwindFlowbiteComponentsI18nBundles,
      ...I18nBundles,
    ]),
  });
