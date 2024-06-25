import { FeatureTimeSeries } from "@howso/openapi-client";
import { atom } from "jotai";
import { isEmpty } from "lodash";
import { ActiveFeature } from "./useFeatureAttributesActiveFeatureAtom";
import { InferFeatureAttributesParamsAtom } from "./useInferFeatureAttributesParamsAtom";
import { FeaturesAttributesAreDirtyAtom } from "./useFeatureAttributesAreDirtyAtom";
import { useMemo } from "react";

export type GetTimeFeatureAtomParams = {
  inferFeatureAttributesParamsAtom: InferFeatureAttributesParamsAtom;
  featuresDirtyAtom: FeaturesAttributesAreDirtyAtom;
};

/*
 * Memoized derived atom to get/set the time feature in feature attributes
 * Causes dirty atom to be tripped when set.
 */
export const useFeatureAttributesTimeFeatureAtom = ({
  inferFeatureAttributesParamsAtom,
  featuresDirtyAtom,
}: GetTimeFeatureAtomParams) =>
  useMemo(
    () =>
      getFeatureAttributesTimeFeatureAtom({
        inferFeatureAttributesParamsAtom,
        featuresDirtyAtom,
      }),
    [inferFeatureAttributesParamsAtom, featuresDirtyAtom],
  );

/*
 * Derived atom to get/set the time feature in feature attributes
 * Causes dirty atom to be tripped when set.
 */
export const getFeatureAttributesTimeFeatureAtom = ({
  inferFeatureAttributesParamsAtom,
  featuresDirtyAtom,
}: GetTimeFeatureAtomParams) =>
  atom(
    (get) => {
      const params = get(inferFeatureAttributesParamsAtom);
      const features = params?.features || {};
      for (const [name, attributes] of Object.entries(features)) {
        if (attributes?.time_series?.time_feature) {
          return { name, attributes };
        }
      }
    },
    (get, set, featureName: ActiveFeature | undefined) => {
      const params = { ...get(inferFeatureAttributesParamsAtom) };
      const features = params?.features || {};
      for (const name of Object.keys(params?.features || {})) {
        const attributes = { ...features[name] };
        if (name === featureName) {
          attributes.time_series = {
            ...attributes.time_series,
            time_feature: true,
          } as FeatureTimeSeries;
        } else {
          // Only one time feature is allowed at a time
          delete attributes.time_series?.time_feature;
          if (isEmpty(attributes.time_series)) delete attributes.time_series;
        }
        features[name] = attributes;
      }
      set(inferFeatureAttributesParamsAtom, features);
      set(featuresDirtyAtom, true);
    },
  );
export type FeatureAttributesTimeFeatureAtom = ReturnType<
  typeof getFeatureAttributesTimeFeatureAtom
>;
