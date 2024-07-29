import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeDataTypeField";

const en = {
  help: {
    formattedDateTime:
      "Formatted Date Time supports string based features such as ISO 8601 or your own custom formats. For numeric date times such as epoch numbers, use a Continuous Number.",
  },
  label: "Data Type",
  options: {
    amalgam: "Amalgam",
    boolean: "Boolean",
    formattedDateTime: "Formatted Date Time",
    groups: {
      continuous: "Continuous",
      nominal: "Nominal",
    },
    json: "JSON",
    number: "Number",
    string: "String",
    stringMixable: "String Mixable",
    yaml: "YAML",
  },
};

type Resource = typeof en;

export const FeatureAttributeDataTypeFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
