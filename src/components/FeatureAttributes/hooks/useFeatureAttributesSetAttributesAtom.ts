import { FeatureAttributes } from "@howso/openapi-client";
import { atom } from "jotai";
import { shouldInferAgain } from "../utils";
import { FeatureAttributesIndexAtom } from "./useFeatureAttributesIndexAtom";
import {
  FeaturesAttributesAreDirtyAtom,
  DirtyFeatureAttributes,
} from "./useFeatureAttributesAreDirtyAtom";
import { useMemo } from "react";

export const useFeatureAttributesSetAttributesAtom = ({
  featureAttributesIndexAtom,
  featuresDirtyAtom,
}: SetFeatureAttributesAtomParams): FeatureAttributesSetAttributesAtom =>
  useMemo(
    () =>
      getFeatureAttributesSetAttributesAtom({
        featureAttributesIndexAtom,
        featuresDirtyAtom,
      }),
    [featureAttributesIndexAtom, featuresDirtyAtom],
  );

export type SetFeatureAttributesAtomParams = {
  featureAttributesIndexAtom: FeatureAttributesIndexAtom;
  featuresDirtyAtom: FeaturesAttributesAreDirtyAtom;
};
export const getFeatureAttributesSetAttributesAtom = ({
  featureAttributesIndexAtom,
  featuresDirtyAtom,
}: SetFeatureAttributesAtomParams) =>
  atom(
    null,
    (
      get,
      set,
      feature: string,
      attributes: FeatureAttributes,
      dirty: DirtyFeatureAttributes,
    ) => {
      const allFeatures = get(featureAttributesIndexAtom);
      set(featureAttributesIndexAtom, {
        ...allFeatures,
        [feature]: {
          ...allFeatures[feature],
          ...attributes,
        },
      });
      if (shouldInferAgain(dirty)) set(featuresDirtyAtom, true);
    },
  );

export type FeatureAttributesSetAttributesAtom = ReturnType<
  typeof getFeatureAttributesSetAttributesAtom
>;
