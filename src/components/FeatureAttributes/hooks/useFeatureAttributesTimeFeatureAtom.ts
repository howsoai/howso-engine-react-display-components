import { FeatureTimeSeries } from "@howso/openapi-client";
import { atom } from "jotai";
import { isEmpty } from "lodash";
import { ActiveFeature } from "./useFeatureAttributesActiveFeatureAtom";
import { FeatureAttributesIndexAtom } from "./useFeatureAttributesIndexAtom";
import { FeaturesAttributesAreDirtyAtom } from "./useFeatureAttributesAreDirtyAtom";
import { useMemo } from "react";

export type GetTimeFeatureAtomParams = {
  featureAttributesIndexAtom: FeatureAttributesIndexAtom;
  featuresDirtyAtom: FeaturesAttributesAreDirtyAtom;
};

/*
 * Memoized derived atom to get/set the time feature in feature attributes
 * Causes dirty atom to be tripped when set.
 */
export const useFeatureAttributesTimeFeatureAtom = ({
  featureAttributesIndexAtom,
  featuresDirtyAtom,
}: GetTimeFeatureAtomParams) =>
  useMemo(
    () =>
      getFeatureAttributesTimeFeatureAtom({
        featureAttributesIndexAtom,
        featuresDirtyAtom,
      }),
    [featureAttributesIndexAtom, featuresDirtyAtom],
  );

/*
 * Derived atom to get/set the time feature in feature attributes
 * Causes dirty atom to be tripped when set.
 */
export const getFeatureAttributesTimeFeatureAtom = ({
  featureAttributesIndexAtom,
  featuresDirtyAtom,
}: GetTimeFeatureAtomParams) =>
  atom(
    (get) => {
      const features = get(featureAttributesIndexAtom);
      for (const [name, attributes] of Object.entries(features)) {
        if (attributes?.time_series?.time_feature) {
          return { name, attributes };
        }
      }
    },
    (get, set, featureName: ActiveFeature) => {
      const features = { ...get(featureAttributesIndexAtom) };
      for (const name of Object.keys(features)) {
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
      set(featureAttributesIndexAtom, features);
      set(featuresDirtyAtom, true);
    },
  );
export type FeatureAttributesTimeFeatureAtom = ReturnType<
  typeof getFeatureAttributesTimeFeatureAtom
>;
