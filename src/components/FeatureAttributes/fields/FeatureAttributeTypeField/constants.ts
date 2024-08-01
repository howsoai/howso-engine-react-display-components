import { FeatureAttributeTypeFieldI18nBundle as i18n } from "./FeatureAttributeTypeField.i18n";

export const featureAttributeTypeName = "type";

export const featureAttributeTypeLabel = [
  i18n.namespace,
  i18n.strings.label,
].join(":");

export const featureAttributeTypeOptions = {
  continuous: {
    value: "continuous",
    translations: {
      label: i18n.strings.options.continuous,
      help: {
        description: i18n.strings.help.continuous.description,
        example: i18n.strings.help.continuous.example,
      },
    },
  },
  nominal: {
    value: "nominal",
    translations: {
      label: i18n.strings.options.nominal,
      help: {
        description: i18n.strings.help.nominal.description,
        example: i18n.strings.help.nominal.example,
      },
    },
  },
  ordinal: {
    value: "ordinal",
    translations: {
      label: i18n.strings.options.ordinal,
      help: {
        description: i18n.strings.help.ordinal.description,
        example: i18n.strings.help.ordinal.example,
      },
    },
  },
};
