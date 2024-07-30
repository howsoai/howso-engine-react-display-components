import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
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

export const FeatureAttributeTimeSeriesDeltaMinMaxFieldsI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
