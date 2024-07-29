import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesNumLagsField";

const en = {
  help: "If provided, will generate the specified number of derivatives and boundary values.",
  label: "Number of Lags",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesNumLagsFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
