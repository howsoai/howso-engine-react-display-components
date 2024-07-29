import { Il8nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";
import { FeatureAttributesFieldsIl8nBundles } from "./fields";
import { FeatureAttributesGroupsIl8nBundles } from "./groups";
import { FeatureAttributeSampleIl8nBundle } from "./FeatureAttributeSample";
import { FeaturesAttributesCompactIl8nBundle } from "./FeaturesAttributesCompact";
import { FeaturesAttributesDependenciesIl8nBundle } from "./FeaturesAttributesDependencies";
import { FeaturesAttributesRowsIl8nBundle } from "./FeaturesAttributesRows";
import { FeatureAttributesConfigurationIssuesIl8nBundle } from "./FeatureAttributesConfigurationIssues";

export * from "./FeatureAttributeSample";
export * from "./FeatureAttributesConfiguration";
export * from "./FeatureAttributesConfigurationIssues";
export * from "./FeaturesAttributesContext";
export * from "./FeaturesAttributesCompact";
export * from "./FeaturesAttributesDependencies";
export * from "./FeaturesAttributesRows";
export * from "./FeatureAttributesConfigurationIssues/FeatureAttributesConfigurationIssues.il8n";
export * from "./hooks";
export * from "./fields";
export * from "./groups";
export * from "./types";
export * from "./utils";

export const FeatureAttributesIl8nBundles: Il8nBundle<Languages, any>[] = [
  ...FeatureAttributesFieldsIl8nBundles,
  ...FeatureAttributesGroupsIl8nBundles,
  FeatureAttributeSampleIl8nBundle,
  FeaturesAttributesCompactIl8nBundle,
  FeaturesAttributesDependenciesIl8nBundle,
  FeaturesAttributesRowsIl8nBundle,
  FeatureAttributesConfigurationIssuesIl8nBundle,
];
