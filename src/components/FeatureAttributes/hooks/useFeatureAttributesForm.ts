import { useForm } from "react-hook-form";
import {
  InferFeatureAttributeFormValues,
  getFeatureAttributesForType,
  getFeatureAttributesBoundingMode,
} from "../utils";
import { InferFeatureAttributesParams } from "../types";

export const useFeatureAttributesForm = (
  params: InferFeatureAttributesParams,
  feature: string,
) => {
  return useForm<InferFeatureAttributeFormValues>({
    defaultValues: getFeatureAttributesFormDefaultValues(params, feature),
    shouldUnregister: true,
  });
};

export const getFeatureAttributesFormDefaultValues = (
  params: InferFeatureAttributesParams,
  feature: string,
): InferFeatureAttributeFormValues => {
  const attributes = params.features?.[feature];

  return {
    ...getFeatureAttributesForType(attributes),
    reserved: {
      boundingMode: getFeatureAttributesBoundingMode(params, feature),
      isDateTime: !!attributes?.date_time_format,
    },
  };
};
