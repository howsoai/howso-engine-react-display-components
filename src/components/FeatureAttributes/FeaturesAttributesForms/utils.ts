import { isNull } from "@/utils";
import { FeatureAttributes } from "@howso/openapi-client";

export type FeatureAttributeFormValues = FeatureAttributes & {
  is_datetime: boolean;
};

/**
 * Reshapes form data, which has empty strings and arrays, etc
 * into the feature attributes format by removing those empty values.
 */
export const getFeatureAttributesFromFormData = (
  data: FeatureAttributeFormValues,
): FeatureAttributes => {
  const attributes = Object.entries(data).reduce((attributes, [key, value]) => {
    const skipKeys: (keyof FeatureAttributeFormValues)[] = [
      "is_datetime",
      "sample",
    ];
    const keyAs = key as keyof FeatureAttributeFormValues;
    if (skipKeys.includes(keyAs)) {
      return attributes;
    }
    if (isFormDataEmpty(value)) {
      return attributes;
    }
    // @ts-expect-error Shoosh
    attributes[keyAs] = sanitizeFeatureAttributeValue(value);
    return attributes;
  }, {} as FeatureAttributes);

  if (attributes.time_series) {
    attributes.time_series = Object.entries(attributes.time_series).reduce(
      (attributes, [key, value]) => {
        if (isFormDataEmpty(value)) {
          return attributes;
        }

        // @ts-expect-error Shoosh
        attributes[key] = sanitizeFeatureAttributeValue(value);
        return attributes;
      },
      {} as FeatureAttributes["time_series"],
    );
  }

  if (attributes.bounds) {
    attributes.bounds = Object.entries(attributes.bounds).reduce(
      (attributes, [key, value]) => {
        if (isFormDataEmpty(value)) {
          return attributes;
        }

        // @ts-expect-error Shoosh
        attributes[key] = sanitizeFeatureAttributeValue(value);
        return attributes;
      },
      {} as FeatureAttributes["bounds"],
    );
  }

  if (!attributes.id_feature || attributes.type === "continuous")
    attributes.id_feature = undefined;
  return attributes;
};

const isFormDataEmpty = (value: unknown): boolean => {
  if (value === "") {
    return true;
  }

  if (isNull(value)) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  return false;
};

const sanitizeFeatureAttributeValue = (value: unknown): unknown => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeFeatureAttributeValue);
  }

  return value;
};
