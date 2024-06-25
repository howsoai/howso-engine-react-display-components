import { Getter, Setter, atom } from "jotai";
import {
  FeatureAttributesBoundingMode,
  getFeatureAttributesUnbound,
} from "../utils";
import { InferFeatureAttributesParamsAtom } from "./useInferFeatureAttributesParamsAtom";
import { useMemo } from "react";

export const useInferFeatureAttributesParamsSetParamAtom = ({
  inferFeatureAttributesParamsAtom,
  // featuresDirtyAtom,
}: GetInferFeatureAttributesParamsSetParamAtomParams): InferFeatureAttributesParamsSetParamAtom =>
  useMemo(
    () =>
      getInferFeatureAttributesParamsSetParamAtom({
        inferFeatureAttributesParamsAtom,
        // featuresDirtyAtom,
      }),
    [
      inferFeatureAttributesParamsAtom,
      //  featuresDirtyAtom
    ],
  );

export type GetInferFeatureAttributesParamsSetParamAtomParams = {
  inferFeatureAttributesParamsAtom: InferFeatureAttributesParamsAtom;
  // featuresDirtyAtom: FeaturesAttributesAreDirtyAtom;
};
export const getInferFeatureAttributesParamsSetParamAtom = ({
  inferFeatureAttributesParamsAtom,
  // featuresDirtyAtom,
}: GetInferFeatureAttributesParamsSetParamAtomParams) =>
  atom(
    null,
    (
      get,
      set,
      payload: InferFeatureAttributesParamsSetParamPayload,
      // dirty: DirtyFeatureAttributes
    ) => {
      switch (payload.action) {
        case "setBoundingMode":
          setBoundingMode(get, set, inferFeatureAttributesParamsAtom, payload);
      }
      // TODO, which options require new infer?
      // if (shouldInferAgain(dirty)) set(featuresDirtyAtom, true);
    },
  );

export type InferFeatureAttributesParamsSetParamAtom = ReturnType<
  typeof getInferFeatureAttributesParamsSetParamAtom
>;

export type InferFeatureAttributesParamsSetParamPayload =
  InferFeatureAttributesParamsSetParamBoundingModePayload;

// Bounding modes

export type InferFeatureAttributesParamsSetParamBoundingModePayload = {
  action: "setBoundingMode";
  feature: string;
  mode: FeatureAttributesBoundingMode | undefined;
};
const setBoundingMode = (
  get: Getter,
  set: Setter,
  inferFeatureAttributesParamsAtom: InferFeatureAttributesParamsAtom,
  payload: InferFeatureAttributesParamsSetParamBoundingModePayload,
) => {
  const params = get(inferFeatureAttributesParamsAtom);
  const tightBoundsSet = new Set(params.tight_bounds);

  switch (payload.mode) {
    case "userDefined":
      tightBoundsSet.delete(payload.feature);
      set(inferFeatureAttributesParamsAtom, {
        ...params,
        tight_bounds: Array.from(tightBoundsSet),
        // features: {
        //   ...params.features,
        // TODO, can I find the bounds we had originally somewhere...? Probably in the calculated features...
        // [payload.feature]: getFeatureAttributesCalculatedBounds(
        //   params.features?.[payload.feature]
        // ),
        // },
      });
      return;
    case "tightBounds":
      tightBoundsSet.add(payload.feature);
      set(inferFeatureAttributesParamsAtom, {
        ...params,
        tight_bounds: Array.from(tightBoundsSet),
        features: {
          ...params.features,
          [payload.feature]: getFeatureAttributesUnbound(
            params.features?.[payload.feature],
          ),
        },
      });
      return;
    case "auto":
    case undefined:
      tightBoundsSet.delete(payload.feature);
      set(inferFeatureAttributesParamsAtom, {
        ...params,
        tight_bounds: Array.from(tightBoundsSet),
        features: {
          ...params.features,
          [payload.feature]: getFeatureAttributesUnbound(
            params.features?.[payload.feature],
          ),
        },
      });
      return;
    default:
      throw new Error(`Unhandled bounding mode: ${payload.mode}`);
  }
};
