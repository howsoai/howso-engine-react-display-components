import { InferFeatureAttributesBoundingMode } from "../../utils";
import { FeatureAttributeReservedBoundingModeFieldI18nBundle as i18n } from "./FeatureAttributeReservedBoundingModeField.i18n";

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
      label: i18n.strings.options.auto,
      help: i18n.strings.help.auto,
    },
  },
  {
    value: "tightBounds",
    translations: {
      label: i18n.strings.options.tightBounds,
      help: i18n.strings.help.tightBounds,
    },
  },
  {
    value: "userDefined",
    translations: {
      label: i18n.strings.options.userDefined,
      help: i18n.strings.help.userDefined,
    },
  },
];
