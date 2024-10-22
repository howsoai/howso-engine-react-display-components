import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeDataTypeField";

const en = {
  help: {
    formattedDateTime:
      "Formatted date time supports string based features such as ISO 8601 or your own custom formats. For numeric date times such as epoch numbers, use a Continuous Number.",
    formattedTime:
      "Formatted time supports string based features such as ISO 8601 partials or your own custom formats. For numeric date times such as epoch numbers, use a Continuous Number.",
  },
  label: "Data Type",
  options: {
    amalgam: "Amalgam",
    boolean: "Boolean",
    formattedDateTime: "Formatted date time",
    formattedTime: "Formatted time",
    groups: {
      continuous: "Continuous",
      nominal: "Nominal",
    },
    json: "JSON",
    number: "Number",
    string: "String",
    stringMixable: "String mixable",
    yaml: "YAML",
  },
};

type Resource = typeof en;

export const FeatureAttributeDataTypeFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
