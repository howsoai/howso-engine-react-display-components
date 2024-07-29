import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeSubtypeField";

const en = {
  help: "Your platform supports a default list of options. Refer to documentation for creation of a custom subtype.",
  label: "Subtype",
};

type Resource = typeof en;

export const FeatureAttributeSubtypeFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
