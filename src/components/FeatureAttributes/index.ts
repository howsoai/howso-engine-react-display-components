import { I18nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";
import { FeatureAttributesFieldsI18nBundles } from "./fields";
import { FeatureAttributesGroupsI18nBundles } from "./groups";
import { FeatureAttributeSampleI18nBundle } from "./FeatureAttributeSample";
import { FeaturesAttributesCompactI18nBundle } from "./FeaturesAttributesCompact";
import { FeaturesAttributesDependenciesI18nBundle } from "./FeaturesAttributesDependencies";
import { FeaturesAttributesRowsI18nBundle } from "./FeaturesAttributesRows";
import { FeatureAttributesConfigurationIssuesI18nBundle } from "./FeatureAttributesConfigurationIssues";

export * from "./FeatureAttributeSample";
export * from "./FeatureAttributesConfiguration";
export * from "./FeatureAttributesConfigurationIssues";
export * from "./FeaturesAttributesContext";
export * from "./FeaturesAttributesCompact";
export * from "./FeaturesAttributesDependencies";
export * from "./FeaturesAttributesRows";
export * from "./FeatureAttributesConfigurationIssues/FeatureAttributesConfigurationIssues.i18n";
export * from "./hooks";
export * from "./fields";
export * from "./groups";
export * from "./types";
export * from "./utils";

export const FeatureAttributesI18nBundles: I18nBundle<Languages, any>[] = [
  ...FeatureAttributesFieldsI18nBundles,
  ...FeatureAttributesGroupsI18nBundles,
  FeatureAttributeSampleI18nBundle,
  FeaturesAttributesCompactI18nBundle,
  FeaturesAttributesDependenciesI18nBundle,
  FeaturesAttributesRowsI18nBundle,
  FeatureAttributesConfigurationIssuesI18nBundle,
];
