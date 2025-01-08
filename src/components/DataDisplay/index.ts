import { Languages } from "@howso/react-tailwind-flowbite-components";
import { I18nBundle } from "@howso/ui-internationalization-utils";
import { EnginePropertyLabelsI18nBundle } from "./PropertyLabels";

export * from "./PropertyLabels";

export const DataDisplayI18nBundles: I18nBundle<Languages, any>[] = [
  EnginePropertyLabelsI18nBundle,
];
