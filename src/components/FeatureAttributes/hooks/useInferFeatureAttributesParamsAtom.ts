import { atomWithReset } from "jotai/utils";
import { useMemo } from "react";
import { InferFeatureAttributesParams } from "../types";

export const useInferFeatureAttributesParamsAtom = (
  params: InferFeatureAttributesParams,
): InferFeatureAttributesParamsAtom =>
  useMemo(() => getInferFeatureAttributesParamsAtom(params), [params]);

export const getInferFeatureAttributesParamsAtom = (
  params: InferFeatureAttributesParams,
) => atomWithReset<InferFeatureAttributesParams>(params);

export type InferFeatureAttributesParamsAtom = ReturnType<
  typeof getInferFeatureAttributesParamsAtom
>;
