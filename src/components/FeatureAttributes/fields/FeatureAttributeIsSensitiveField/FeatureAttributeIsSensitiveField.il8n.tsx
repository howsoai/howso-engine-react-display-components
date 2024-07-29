import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeIsSensitiveField";

const en = {
  help: "By default, all data is treated as sensitive, you can change data to be non-sensitive, allowing the values to be re-used in the generation of synthetic data.",
  label: "Sensitive",
};

type Resource = typeof en;

export const FeatureAttributeIsSensitiveFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
