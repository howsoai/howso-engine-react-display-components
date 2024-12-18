import { I18nBundle } from "@howso/ui-internationalization-utils";
import { DataDisplayI18nBundles, TraineeI18nBundles } from "./components";
import { FeatureAttributesI18nBundles } from "./components/FeatureAttributes";
import { Languages } from "./constants";

export * from "./components";
export * from "./constants";
export * from "./hooks";
export * from "./utils";

export const I18nBundles: I18nBundle<Languages, any>[] = [
  ...DataDisplayI18nBundles,
  ...FeatureAttributesI18nBundles,
  ...TraineeI18nBundles,
];
