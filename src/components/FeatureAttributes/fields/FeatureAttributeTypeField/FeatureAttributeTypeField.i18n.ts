import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeTypeField";

const en = {
  help: {
    continuous: {
      description: "A continuous numeric value.",
      example: "e.g. Temperature or humidity.",
    },
    empty: {
      description: "Please select a type to continue.",
    },
    nominal: {
      description:
        "A qualitative representation of something that is not quantitative or ordered.",
      example: "e.g. The name of a fruit.",
    },
    ordinal: {
      description: "A nominal value with specific ordering.",
      example: "e.g. Rating scale, 1-5 stars.",
    },
  },
  label: "Type",
  options: {
    continuous: "Continuous",
    nominal: "Nominal",
    ordinal: "Ordinal",
  },
};

type Resource = typeof en;

export const FeatureAttributeTypeFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
