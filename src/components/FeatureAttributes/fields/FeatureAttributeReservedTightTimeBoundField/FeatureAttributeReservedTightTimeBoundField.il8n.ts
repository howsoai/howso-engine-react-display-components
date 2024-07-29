import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeReservedTightTimeBoundField";

const en = {
  label: "Tight time bounds",
};

type Resource = typeof en;

export const FeatureAttributeReservedTightTimeBoundFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
