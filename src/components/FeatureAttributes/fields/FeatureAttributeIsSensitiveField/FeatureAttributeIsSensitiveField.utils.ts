import { FeatureAttributes } from "@howso/engine";
import { IFeatureAttributePurposes } from "../../types";

export const isFeatureAttributeSensitiveAttributeAvailable = (
  attributes:
    | Partial<Pick<FeatureAttributes, "type" | "data_type">>
    | undefined,
  params: IFeatureAttributePurposes,
): boolean => {
  if (!params.purposes.includes("synthesis")) {
    return false;
  }

  if (!attributes) {
    return false;
  }
  const { type, data_type } = attributes;

  if (type === "continuous") {
    return false;
  }
  switch (data_type) {
    case "boolean":
      return false;
    default:
      return true;
  }
};
