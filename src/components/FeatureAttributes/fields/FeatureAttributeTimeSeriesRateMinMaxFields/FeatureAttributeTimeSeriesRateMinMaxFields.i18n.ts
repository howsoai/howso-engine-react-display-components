import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeTimeSeriesRateMinMaxFields";

const en = {
  help: "Constraints for the rate or delta (the difference quotient, the discrete version of derivative) of this feature. A `null` value means no min boundary. The value must be in epoch format for the time feature. The length of the list must match the number of derivatives as specified by order.",
  label: {
    max: "Max",
    min: "Min",
  },
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesRateMinMaxFieldsI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
