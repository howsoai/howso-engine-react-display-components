import { FeatureAttributes } from "@howso/engine";
import { atom } from "jotai";
import { useMemo } from "react";
import { isEmpty } from "../../../utils";
import { InferFeatureAttributesParams } from "../types";
import { ActiveFeature } from "./useFeatureAttributesActiveFeatureAtom";
import { InferFeatureAttributesParamsAtom } from "./useInferFeatureAttributesParamsAtom";
import { InferFeatureAttributesRunRequiredFieldsAtom } from "./useInferFeatureAttributesRunRequiredFields";

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
      return getTimeFeature(params);
    },
    (get, set, featureName: ActiveFeature | undefined) => {
      const params = get(paramsAtom);

      setTimeFeature({
        featureName,
        params,
        setParams: (params) => set(paramsAtom, params),
        setRunRequired: (required) => set(runRequiredAtom, required),
      });
    },
  );
export type InferFeatureAttributesParamsTimeFeatureAtom = ReturnType<
  typeof getInferFeatureAttributesParamsTimeFeatureAtom
>;

type TimeFeatureObject = { name: string; attributes: FeatureAttributes };
type TimeFeatureValue = TimeFeatureObject | undefined;

const getTimeFeature = (
  params: InferFeatureAttributesParams,
): TimeFeatureValue | undefined => {
  const features = params?.features || {};
  for (const [name, attributes] of Object.entries(features)) {
    if (attributes?.time_series?.time_feature) {
      return { name, attributes };
    }
  }
};

type SetTimeFeatureParams = {
  featureName: string | undefined | null;
  params: InferFeatureAttributesParams;
  setParams: (params: InferFeatureAttributesParams) => void;
  setRunRequired: (required: boolean) => void;
};
const setTimeFeature = ({
  featureName,
  params,
  setParams,
  setRunRequired,
}: SetTimeFeatureParams) => {
  const features = { ...params.features };
  for (const name of Object.keys(params?.features || {})) {
    const attributes = { ...features[name] };
    if (name === featureName) {
      attributes.time_series = {
        ...attributes.time_series,
        time_feature: true,
      } as FeatureAttributes["time_series"];
    } else {
      // Only one time feature is allowed at a time
      delete attributes.time_series?.time_feature;
      if (isEmpty(attributes.time_series)) delete attributes.time_series;
    }
    features[name] = attributes;
  }
  setParams({ ...params, features });
  setRunRequired(true);
};
