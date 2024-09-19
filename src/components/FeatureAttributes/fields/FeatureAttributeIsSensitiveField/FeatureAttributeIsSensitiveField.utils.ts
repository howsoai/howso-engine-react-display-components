import { FeatureAttributes } from "@howso/engine";

export const isFeatureAttributeSensitiveAttributeAvailable = (
  attributes:
    | Partial<Pick<FeatureAttributes, "type" | "data_type">>
    | undefined,
): boolean => {
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
