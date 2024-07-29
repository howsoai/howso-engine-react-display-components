import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesTypeField";

const en = {
  help: "When `rate` is specified, uses the difference of the current value from its previous value divided by the change in time since the previous value. When `delta` is specified, uses the difference of the current value from its previous value regardless of the elapsed time.",
  label: "Type",
  options: {
    delta: "Delta",
    rate: "Rate",
  },
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesTypeFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
