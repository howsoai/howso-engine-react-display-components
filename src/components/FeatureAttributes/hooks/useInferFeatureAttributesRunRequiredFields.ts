import { atom } from "jotai";
import { useMemo } from "react";
import { FieldNamesMarkedBoolean } from "react-hook-form";
import { InferFeatureAttributeFormValues } from "../utils";

export type InferFeatureAttributesRunRequiredFields = Partial<
  FieldNamesMarkedBoolean<InferFeatureAttributeFormValues>
>;
/* Memoized boolean atom have been modified and require re-run of infer */
export const useInferFeatureAttributesRunRequiredFields = (
  required: boolean = false,
): InferFeatureAttributesRunRequiredFieldsAtom =>
  useMemo(
    () => getInferFeatureAttributesRunRequiredFields(required),
    [required],
  );

/* Boolean atom have been modified and require re-run of infer */
export const getInferFeatureAttributesRunRequiredFields = (
  required: boolean = false,
) => atom(required);
export type InferFeatureAttributesRunRequiredFieldsAtom = ReturnType<
  typeof getInferFeatureAttributesRunRequiredFields
>;
