import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeDerivedFeatureCodeField";

const en = {
  help: "<0>Amalgam</0> code defining how the value for this feature could be derived if this feature is specified as a `derived_context_feature` or a `derived_action_feature` during `react` flows.",
  label: "Derived Feature Code",
  placeholder: `; Simple example: Use the value for feature 'x' from the previously processed row (offset of 1, one lag value).
#x 1
; Complex example: If 'target' feature for this row is 2, return true if 'sepal-length' feature is less than 4.5, otherwise return true.
(if (= #target 0 2)
  (< #sepal-length 0 4.5) ;must be less than 4.5
  (true)
)
`,
};

type Resource = typeof en;

export const FeatureAttributeDerivedFeatureCodeFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
