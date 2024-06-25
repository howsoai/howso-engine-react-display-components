const base = "FeatureAttributes.FeatureAttributeTypeField";

export const featureAttributeTypeName = "type";

export const featureAttributeTypeLabel = `${base}.label`;

export const featureAttributeTypeOptions = {
  continuous: {
    value: "continuous",
    translations: {
      label: `${base}.options.continuous`,
      help: {
        description: `${base}.help.continuous.description`,
        example: `${base}.help.continuous.example`,
      },
    },
  },
  nominal: {
    value: "nominal",
    translations: {
      label: `${base}.options.nominal`,
      help: {
        description: `${base}.help.nominal.description`,
        example: `${base}.help.nominal.example`,
      },
    },
  },
  ordinal: {
    value: "ordinal",
    translations: {
      label: `${base}.options.ordinal`,
      help: {
        description: `${base}.help.ordinal.description`,
        example: `${base}.help.ordinal.example`,
      },
    },
  },
};
