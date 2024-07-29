import { Il8nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";
import { FeatureAttributesBoundsGroupIl8nBundle } from "./FeatureAttributesBoundsGroup";
import { FeatureAttributesContinuousNumbersGroupIl8nBundle } from "./FeatureAttributesContinuousNumbersGroup";
import { FeatureAttributesGroupBaseIl8nBundle } from "./FeatureAttributesGroupBase";
import { FeatureAttributesProgrammableGroupIl8nBundle } from "./FeatureAttributesProgrammableGroup";
import { FeatureAttributesTemporalityGroupIl8nBundle } from "./FeatureAttributesTemporalityGroup";

export * from "./FeatureAttributesBoundsGroup";
export * from "./FeatureAttributesContinuousNumbersGroup";
export * from "./FeatureAttributesGroupBase";
export * from "./FeatureAttributesProgrammableGroup";
export * from "./FeatureAttributesTemporalityGroup";

export const FeatureAttributesGroupsIl8nBundles: Il8nBundle<Languages, any>[] =
  [
    FeatureAttributesBoundsGroupIl8nBundle,
    FeatureAttributesContinuousNumbersGroupIl8nBundle,
    FeatureAttributesGroupBaseIl8nBundle,
    FeatureAttributesProgrammableGroupIl8nBundle,
    FeatureAttributesTemporalityGroupIl8nBundle,
  ];
