import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributePostProcessField";

const en = {
  help: "<0>Amalgam</0> code that is called on resulting values of this feature during `react` operations.",
  label: "Post Process Code",
  placeholder: `; Simple example: Included standard text prefixing 'target'.
(concat "PROCESSED: " #target 0)
; Complex example: Generate a nickname using 'name' based on 'age' feature.
(if (< #age 0 18) ; If the person is under 18
  (concat "Lil " #name 0) ; Prefix with a Diminutive
  #name 0 ; Don't adjust other names
)`,
};

type Resource = typeof en;

export const FeatureAttributePostProcessFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
