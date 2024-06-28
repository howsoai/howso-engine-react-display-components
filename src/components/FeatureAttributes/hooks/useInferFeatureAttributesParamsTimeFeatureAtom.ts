import { FeatureTimeSeries } from "@howso/openapi-client";
import { atom } from "jotai";
import { isEmpty } from "lodash";
import { ActiveFeature } from "./useFeatureAttributesActiveFeatureAtom";
import { InferFeatureAttributesParamsAtom } from "./useInferFeatureAttributesParamsAtom";
import { InferFeatureAttributesRunRequiredFieldsAtom } from "./useInferFeatureAttributesRunRequiredFields";
import { useMemo } from "react";

export type GetInferFeatureAttributesParamsTimeFeatureAtom = {
  paramsAtom: InferFeatureAttributesParamsAtom;
  runRequiredAtom: InferFeatureAttributesRunRequiredFieldsAtom;
};

/*
 * Memoized derived atom to get/set the time feature in feature attributes
 * Causes run required atom to be tripped when set.
 */
export const useInferFeatureAttributesParamsTimeFeatureAtom = ({
  paramsAtom,
  runRequiredAtom,
}: GetInferFeatureAttributesParamsTimeFeatureAtom) =>
  useMemo(
    () =>
      getInferFeatureAttributesParamsTimeFeatureAtom({
        paramsAtom,
        runRequiredAtom,
      }),
    [paramsAtom, runRequiredAtom],
  );

/*
 * Derived atom to get/set the time feature in feature attributes
 * Causes run required atom to be tripped when set.
 */
export const getInferFeatureAttributesParamsTimeFeatureAtom = ({
  paramsAtom,
  runRequiredAtom,
}: GetInferFeatureAttributesParamsTimeFeatureAtom) =>
  atom(
    (get) => {
      const params = get(paramsAtom);
      const features = params?.features || {};
      for (const [name, attributes] of Object.entries(features)) {
        if (attributes?.time_series?.time_feature) {
          return { name, attributes };
        }
      }
    },
    (get, set, featureName: ActiveFeature | undefined) => {
      const params = get(paramsAtom);
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
      set(paramsAtom, { ...params, features });
      set(runRequiredAtom, true);
    },
  );
export type InferFeatureAttributesParamsTimeFeatureAtom = ReturnType<
  typeof getInferFeatureAttributesParamsTimeFeatureAtom
>;
