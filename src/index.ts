import { Il8nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "./constants";
import { FeatureAttributesIl8nBundles } from "./components/FeatureAttributes";

export * from "./constants";
export * from "./components";
export * from "./hooks";
export * from "./utils";

export const Il8nBundles: Il8nBundle<Languages, any>[] = [
  ...FeatureAttributesIl8nBundles,
];
