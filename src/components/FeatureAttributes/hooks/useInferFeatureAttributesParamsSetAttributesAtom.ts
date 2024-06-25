import { FeatureAttributes } from "@howso/openapi-client";
import { atom } from "jotai";
import { shouldInferAgain } from "../utils";
import { InferFeatureAttributesParamsAtom } from "./useInferFeatureAttributesParamsAtom";
import {
  FeaturesAttributesAreDirtyAtom,
  DirtyFeatureAttributes,
} from "./useFeatureAttributesAreDirtyAtom";
import { useMemo } from "react";
import { InferFeatureAttributesParams } from "../types";

export const useInferFeatureAttributesParamsSetFeatureAttributesAtom = ({
  inferFeatureAttributesParamsAtom,
  featuresDirtyAtom,
}: GetInferFeatureAttributesParamsSetFeatureAttributesAtomParams): InferFeatureAttributesParamsSetFeatureAttributesAtom =>
  useMemo(
    () =>
      getInferFeatureAttributesParamsSetFeatureAttributesAtom({
        inferFeatureAttributesParamsAtom,
        featuresDirtyAtom,
      }),
    [inferFeatureAttributesParamsAtom, featuresDirtyAtom],
  );

export type GetInferFeatureAttributesParamsSetFeatureAttributesAtomParams = {
  inferFeatureAttributesParamsAtom: InferFeatureAttributesParamsAtom;
  featuresDirtyAtom: FeaturesAttributesAreDirtyAtom;
};
export const getInferFeatureAttributesParamsSetFeatureAttributesAtom = ({
  inferFeatureAttributesParamsAtom,
  featuresDirtyAtom,
}: GetInferFeatureAttributesParamsSetFeatureAttributesAtomParams) =>
  atom(
    null,
    (
      get,
      set,
      feature: string,
      attributes: FeatureAttributes,
      dirty: DirtyFeatureAttributes,
    ) => {
      const params = get(inferFeatureAttributesParamsAtom);
      const mergedParams: InferFeatureAttributesParams = {
        ...params,
        features: {
          ...params.features,
          [feature]: {
            ...params.features?.[feature],
            ...attributes,
          },
        },
      };
      set(inferFeatureAttributesParamsAtom, mergedParams);
      if (shouldInferAgain(dirty)) set(featuresDirtyAtom, true);
    },
  );

export type InferFeatureAttributesParamsSetFeatureAttributesAtom = ReturnType<
  typeof getInferFeatureAttributesParamsSetFeatureAttributesAtom
>;
