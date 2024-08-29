import { I18nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "../../../constants";
import { FeatureAttributesBoundsGroupI18nBundle } from "./FeatureAttributesBoundsGroup";
import { FeatureAttributesContinuousNumbersGroupI18nBundle } from "./FeatureAttributesContinuousNumbersGroup";
import { FeatureAttributesGroupBaseI18nBundle } from "./FeatureAttributesGroupBase";
import { FeatureAttributesProgrammableGroupI18nBundle } from "./FeatureAttributesProgrammableGroup";
import { FeatureAttributesTemporalityGroupI18nBundle } from "./FeatureAttributesTemporalityGroup";

export * from "./FeatureAttributesBoundsGroup";
export * from "./FeatureAttributesContinuousNumbersGroup";
export * from "./FeatureAttributesGroupBase";
export * from "./FeatureAttributesProgrammableGroup";
export * from "./FeatureAttributesTemporalityGroup";

export const FeatureAttributesGroupsI18nBundles: I18nBundle<Languages, any>[] =
  [
    FeatureAttributesBoundsGroupI18nBundle,
    FeatureAttributesContinuousNumbersGroupI18nBundle,
    FeatureAttributesGroupBaseI18nBundle,
    FeatureAttributesProgrammableGroupI18nBundle,
    FeatureAttributesTemporalityGroupI18nBundle,
  ];
