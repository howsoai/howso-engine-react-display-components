import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesStopOnTerminatorsField";

const en = {
  help: "Require that a series ends on a terminator value.",
  label: "Stop on Terminator",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesStopOnTerminatorsFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
