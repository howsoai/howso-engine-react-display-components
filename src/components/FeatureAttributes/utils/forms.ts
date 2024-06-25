import { isFormDataEmpty } from "@/utils/forms";
import { type FeatureAttributes } from "@howso/openapi-client";
import {
  DirtyFeatureAttributes,
  InferFeatureAttributesParamsSetFeatureAttributesAtom,
  InferFeatureAttributesParamsSetParamAtom,
} from "../hooks";
import { type useSetAtom } from "jotai";

export type FeatureAttributeFormValues = FeatureAttributes & {
  /** Values are that are not true Feature Attributes but requires user interactions and save handling */
  reserved?: {
    boundingMode: FeatureAttributesBoundingMode;
    isDateTime: boolean;
  };
};

export type FeatureAttributesBoundingMode =
  | "auto"
  | "tightBounds"
  | "userDefined";

/**
 * Reshapes form data, which has empty strings and arrays, etc
 * into the feature attributes format by removing those empty values.
 */
export const getFeatureAttributesFromFormData = (
  data: FeatureAttributeFormValues,
): FeatureAttributes => {
  const attributes = Object.entries(data).reduce((attributes, [key, value]) => {
    const skipKeys: (keyof FeatureAttributeFormValues)[] = [
      "reserved",
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

const sanitizeFeatureAttributeValue = (value: unknown): unknown => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeFeatureAttributeValue);
  }

  return value;
};

type FeatureAttributesFormSubmitHandlerParams = {
  data: FeatureAttributeFormValues;
  dirtyFields: DirtyFeatureAttributes;
  setFeatureAttributes: ReturnType<
    typeof useSetAtom<InferFeatureAttributesParamsSetFeatureAttributesAtom>
  >;
  setParams: ReturnType<
    typeof useSetAtom<InferFeatureAttributesParamsSetParamAtom>
  >;
  feature: string;
};
export const featureAttributesFormSubmitHandler = ({
  data,
  dirtyFields,
  setFeatureAttributes,
  setParams,
  feature,
}: FeatureAttributesFormSubmitHandlerParams) => {
  // Update all of the attributes
  const attributes = getFeatureAttributesFromFormData(data);
  setFeatureAttributes(feature, attributes, dirtyFields);
  // Take action based any reserved field - TODO, feels like bad performance making two mutations...
  setParams({
    action: "setBoundingMode",
    feature,
    mode: data.reserved?.boundingMode,
  });
};
