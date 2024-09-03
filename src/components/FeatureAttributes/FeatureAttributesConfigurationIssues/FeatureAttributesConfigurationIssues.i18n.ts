import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../constants";

const namespace = "FeatureAttributesConfigurationIssues";

const en = {
  dataTypeUndefined: "Data type is required",
  dateTimeFormatUndefined: "Formatted date times require Date Time Format",
  sensitiveSubtypeUndefined:
    "Sensitive attributes require a Subtype for substitution",
  typeUndefined: "Type is required",
};

type Resource = typeof en;

export const FeatureAttributesConfigurationIssuesI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
