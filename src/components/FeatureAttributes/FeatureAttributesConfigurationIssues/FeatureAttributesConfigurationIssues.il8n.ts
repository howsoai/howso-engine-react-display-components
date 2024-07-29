import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributesConfigurationIssues";

const en = {
  dataTypeUndefined: "Data type is required",
  dateTimeFormatUndefined: "Formatted date times require Date Time Format",
  sensitiveSubtypeUndefined:
    "Sensitive attributes require a Subtype for substitution",
  typeUndefined: "Type is required",
};

type Resource = typeof en;

export const FeatureAttributesConfigurationIssuesIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
