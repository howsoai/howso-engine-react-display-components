import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeCycleLengthField";

const en = {
  help: "Only required if your feature is cyclical, such as days of the week.",
  label: "Cycle Length",
};

type Resource = typeof en;

export const FeatureAttributeCycleLengthFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
