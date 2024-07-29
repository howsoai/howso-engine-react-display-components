import { InferFeatureAttributesBoundingMode } from "../../utils";
import { FeatureAttributeReservedBoundingModeFieldIl8nBundle as il8n } from "./FeatureAttributeReservedBoundingModeField.il8n";

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
      label: il8n.strings.options.auto,
      help: il8n.strings.help.auto,
    },
  },
  {
    value: "tightBounds",
    translations: {
      label: il8n.strings.options.tightBounds,
      help: il8n.strings.help.tightBounds,
    },
  },
  {
    value: "userDefined",
    translations: {
      label: il8n.strings.options.userDefined,
      help: il8n.strings.help.userDefined,
    },
  },
];
