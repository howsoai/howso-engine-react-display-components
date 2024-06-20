import { FeatureAttributes } from "@howso/openapi-client";

export const featureAttributeTypeName = "type";

export const featureAttributeTypeLabel =
  "FeatureAttributes.FeatureAttributeTypeField.label";
export const featureAttributeTypeDefaultValue: FeatureAttributes["type"] =
  "continuous";

export const featureAttributeTypeOptions = {
  continuous: {
    value: "continuous",
    translationKey:
      "FeatureAttributes.FeatureAttributeTypeField.options.continuous",
  },
  nominal: {
    value: "nominal",
    translationKey:
      "FeatureAttributes.FeatureAttributeTypeField.options.nominal",
  },
  ordinal: {
    value: "ordinal",
    translationKey:
      "FeatureAttributes.FeatureAttributeTypeField.options.ordinal",
  },
};
