import { FeatureAttributeTypeFieldIl8nBundle as il8n } from "./FeatureAttributeTypeField.il8n";

export const featureAttributeTypeName = "type";

export const featureAttributeTypeLabel = il8n.strings.label;

export const featureAttributeTypeOptions = {
  continuous: {
    value: "continuous",
    translations: {
      label: il8n.strings.options.continuous,
      help: {
        description: il8n.strings.help.continuous.description,
        example: il8n.strings.help.continuous.example,
      },
    },
  },
  nominal: {
    value: "nominal",
    translations: {
      label: il8n.strings.options.nominal,
      help: {
        description: il8n.strings.help.nominal.description,
        example: il8n.strings.help.nominal.example,
      },
    },
  },
  ordinal: {
    value: "ordinal",
    translations: {
      label: il8n.strings.options.ordinal,
      help: {
        description: il8n.strings.help.ordinal.description,
        example: il8n.strings.help.ordinal.example,
      },
    },
  },
};
