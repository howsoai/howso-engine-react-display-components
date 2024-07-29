import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeMinMaxFields";

const en = {
  label: {
    max: "Max",
    min: "Min",
  },
};

type Resource = typeof en;

export const FeatureAttributeMinMaxFieldsIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
