import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesHasTerminatorsField";

const en = {
  help: "Require the model identify and learn values that explicitly denote the end of a series.",
  label: "Series has Terminators",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesHasTerminatorsFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
