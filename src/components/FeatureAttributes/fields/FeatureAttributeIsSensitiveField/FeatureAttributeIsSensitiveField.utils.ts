import { FeatureAttributes } from "@howso/openapi-client";

export const isFeatureAttributeSensitiveAttributeAvailable = ({
  type,
  data_type,
}: Pick<FeatureAttributes, "type" | "data_type">): boolean => {
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
