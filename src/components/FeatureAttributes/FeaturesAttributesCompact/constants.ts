const base = "FeatureAttributes.FeaturesAttributesCompact";
export const translations = {
  header: {
    fields: {
      feature: {
        label: "Feature",
      },
      timeFeature: {
        label: "Time Feature",
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
    invalidConfiguration: `${base}.labels.invalidConfiguration`,
    sample: `${base}.labels.sample`,
  },
  state: {
    empty: `${base}.state.empty`,
    unselected: `${base}.state.unselected`,
  },
};
