import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { addIl8nBundlesToResources } from "@howso/ui-internationalization-utils";
import { defaultTranslationNamespace as reactTailwindFlowbiteComponentsNs } from "@howso/react-tailwind-flowbite-components";
import howsoReactTailwindFlowbiteComponentsEn from "@howso/react-tailwind-flowbite-components/lib/public/locales/react-tailwind-flowbite-components/en.json" with { type:
  "json" };
import { Il8nBundles } from "../src";

const supportedLngs = ["en"];

export default i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: supportedLngs[0],
    interpolation: { escapeValue: false },
    // react: { useSuspense: true },
    supportedLngs,
    resources: addIl8nBundlesToResources(
      // TODO use the import package
      {
        en: {
          [reactTailwindFlowbiteComponentsNs]:
            howsoReactTailwindFlowbiteComponentsEn,
        },
      },
      Il8nBundles
    ),
  });
