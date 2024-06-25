import { useForm } from "react-hook-form";
import {
  FeatureAttributeFormValues,
  getFeatureAttributesForType,
  getFeatureAttributesBoundingMode,
} from "../utils";
import { InferFeatureAttributesParams } from "../types/api";

export const useFeatureAttributesForm = (
  params: InferFeatureAttributesParams,
  feature: string,
) => {
  const attributes = params.features?.[feature];
  return useForm<FeatureAttributeFormValues>({
    defaultValues: {
      ...getFeatureAttributesForType(attributes),
      reserved: {
        boundingMode: getFeatureAttributesBoundingMode(params, feature),
        isDateTime: !!attributes?.date_time_format,
      },
    },
    shouldUnregister: true,
  });
};
