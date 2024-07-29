import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesOrderField";

const en = {
  help: "If provided, will generate the specified number of derivatives and boundary values.",
  label: "Order",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesOrderFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
