import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeNullIsDependentField";

const en = {
  help: {
    dependencies: "Dependent Features",
    description:
      "Modify how dependent features with `null`s are treated during a `react`, specifically when they use `null` as a context value. When `false` (default), the feature will be treated as a non-dependent context feature. When `true` for nominal types, treats null as an individual dependent class value, only cases that also have `null`s as this feature's value will be considered. When true for continuous types, only the cases with the same dependent feature values as the cases that also have nulls as this feature's value will be considered.",
  },
  label: "Null is Dependent",
};

type Resource = typeof en;

export const FeatureAttributeNullIsDependentFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
