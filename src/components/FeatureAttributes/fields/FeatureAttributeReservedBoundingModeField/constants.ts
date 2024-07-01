import { InferFeatureAttributesBoundingMode } from "../../utils";

const base = "FeatureAttributes.FeatureAttributeReservedBoundingModeField";
export const translations = {
  label: `${base}.label`,
  options: {
    auto: `${base}.options.auto`,
    tightBounds: `${base}.options.tightBounds`,
    userDefined: `${base}.options.userDefined`,
  },
  help: {
    auto: `${base}.help.auto`,
    tightBounds: `${base}.help.tightBounds`,
    userDefined: `${base}.help.userDefined`,
  },
};

export const options: {
  value: InferFeatureAttributesBoundingMode;
  translations: {
    label: string;
    help?: string;
  };
}[] = [
  {
    value: "auto",
    translations: {
      label: translations.options.auto,
      help: translations.help.auto,
    },
  },
  {
    value: "tightBounds",
    translations: {
      label: translations.options.tightBounds,
      help: translations.help.tightBounds,
    },
  },
  {
    value: "userDefined",
    translations: {
      label: translations.options.userDefined,
      help: translations.help.userDefined,
    },
  },
];
