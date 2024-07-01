const base = "FeatureAttributes.FeaturesAttributesCompact";
export const translations = {
  header: {
    fields: {
      feature: {
        label: `${base}.header.fields.feature.label`,
      },
      timeFeature: {
        label: `${base}.header.fields.timeFeature.label`,
      },
    },
  },
  actions: {
    configure: `${base}.actions.configure`,
    configureName: `${base}.actions.configure_{{name}}`,
    mapDependents: `${base}.actions.mapDependents`,
    update: `${base}.actions.update`,
    updateAndGoToTarget: `${base}.actions.updateAndGoTo_{{target}}`,
  },
  form: {
    label: `${base}.form.label`,
  },
  labels: {
    density: {
      compact: `${base}.labels.density.compact`,
      comfortable: `${base}.labels.density.comfortable`,
    },
    invalidConfiguration: `${base}.labels.invalidConfiguration`,
    sample: `${base}.labels.sample`,
  },
  state: {
    empty: `${base}.state.empty`,
    unselected: `${base}.state.unselected`,
  },
};
