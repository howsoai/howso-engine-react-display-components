import { I18nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "./constants";
import { FeatureAttributesI18nBundles } from "./components/FeatureAttributes";

export * from "./constants";
export * from "./components";
export * from "./hooks";
export * from "./utils";

export const I18nBundles: I18nBundle<Languages, any>[] = [
  ...FeatureAttributesI18nBundles,
];
