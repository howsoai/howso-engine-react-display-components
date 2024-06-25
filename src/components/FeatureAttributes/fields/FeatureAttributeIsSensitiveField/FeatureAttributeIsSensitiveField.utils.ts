import { FeatureAttributes } from "@howso/openapi-client";

export const isFeatureAttributeSensitiveAttributeAvailable = (
  attributes: Pick<FeatureAttributes, "type" | "data_type"> | undefined,
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
