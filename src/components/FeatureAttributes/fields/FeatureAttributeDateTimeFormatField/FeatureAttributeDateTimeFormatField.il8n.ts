import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeDateTimeFormatField";

const en = {
  help: "Any valid <1>standard format specification</1> format.",
  label: "Date Time Format",
};

type Resource = typeof en;

export const FeatureAttributeDateTimeFormatFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
