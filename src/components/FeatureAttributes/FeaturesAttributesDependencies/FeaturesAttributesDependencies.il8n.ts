import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeaturesAttributesDependencies";

const en = {
  actions: {
    update: "Update",
  },
  help: "Select features with inter-dependent relationships. This should be used when there are multi-type features that tightly depend on other multi-type features. Setting `null` values may effect dependencies. `Null`s can be managed through the feature's configurations.",
  guidance: {
    expandControl: "More information",
    "1": "Be aware that dependencies introduce further constrains to data and so several dependencies or dependencies on already constrained datasets may restrict which operations are possible while maintaining the dependency. This restricts the cases that can be selected as neighbors to ones that satisfy the dependency, if possible. When not possible, the dependency may not be maintained. ",
    "2": "As a rule of thumb, sets of features that have dependency relationships should generally not include more than 1 continuous feature, unless the continuous features have a small number of values that are commonly used.",
  },
  state: {
    empty: "No features were found in the dataset.",
  },
};

type Resource = typeof en;

export const FeaturesAttributesDependenciesIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
