import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesDerivedOrdersField";

const en = {
  help: "The number of orders of derivatives that should be derived instead of synthesized. Ignored if Order is not provided.",
  label: "Derived Orders",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesDerivedOrdersFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
