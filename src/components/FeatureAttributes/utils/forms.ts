import { isFormDataEmpty } from "@/utils/forms";
import { type FeatureAttributes } from "@howso/openapi-client";
import { InferFeatureAttributesParams } from "../types";
import { getInferFeatureAttributeParamsWithFeatureBoundingMode } from "./state";

export type InferFeatureAttributeFormValues = Partial<FeatureAttributes> & {
  /** Values are that are not true Feature Attributes but requires user interactions and save handling */
  reserved?: {
    /** Provides control on the form for InferFeatureAttributesParams.tight_bounds */
    boundingMode?: InferFeatureAttributesBoundingMode;
    isDateTime: boolean;
    /** Provides control on the form for InferFeatureAttributesParams.tight_time_bounds */
    tightTimeBounds?: boolean;
  };
};

export type InferFeatureAttributesBoundingMode =
  | "auto"
  | "tightBounds"
  | "userDefined";

/**
 * Reshapes form data, which has empty strings and arrays, etc
 * into the feature attributes format by removing those empty values.
 */
export const getInferFeatureAttributesFromFormData = (
  data: InferFeatureAttributeFormValues,
): FeatureAttributes => {
  const attributes = Object.entries(data).reduce((attributes, [key, value]) => {
    const skipKeys: (keyof InferFeatureAttributeFormValues)[] = [
      "reserved",
      "sample",
    ];
    const keyAs = key as keyof InferFeatureAttributeFormValues;
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

const sanitizeFeatureAttributeValue = (value: unknown): unknown => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeFeatureAttributeValue);
  }

  return value;
};

type InferFeatureAttributesFormSubmitHandlerParams = {
  data: InferFeatureAttributeFormValues;
  feature: string;
  params: InferFeatureAttributesParams;
};
/** Returns updated InferFeatureAttributesParams based on form submission */
export const getInferFeatureAttributeParamsFormValuesOnSubmit = ({
  data,
  feature,
  params,
}: InferFeatureAttributesFormSubmitHandlerParams): InferFeatureAttributesParams => {
  // Assemble all changes to the params
  const attributes = getInferFeatureAttributesFromFormData(data);
  const paramsUpdatedWithFeatureAttributes =
    getParamsWithUpdatedFeatureAttributes(params, feature, attributes);

  // Param actions
  const paramsWithBoundingMode =
    getInferFeatureAttributeParamsWithFeatureBoundingMode(
      paramsUpdatedWithFeatureAttributes,
      feature,
      data.reserved?.boundingMode,
    );

  return paramsWithBoundingMode;
};

const getParamsWithUpdatedFeatureAttributes = (
  params: InferFeatureAttributesParams,
  feature: string,
  attributes: FeatureAttributes,
) => ({
  ...params,
  features: {
    ...params.features,
    [feature]: {
      ...params.features?.[feature],
      ...attributes,
    },
  },
});
