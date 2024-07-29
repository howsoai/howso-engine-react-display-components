import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesDeltaMinMaxFields";

const en = {
  help: "Constraints for the delta of this feature. No value means no boundary. The length of the list must match the number of derivatives as specified by Order.",
  label: {
    max: "Delta Max",
    min: "Delta Min",
  },
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesDeltaMinMaxFieldsIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
