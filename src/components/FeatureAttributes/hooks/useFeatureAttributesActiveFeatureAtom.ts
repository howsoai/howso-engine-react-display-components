import { atom } from "jotai";
import { useMemo } from "react";

export type ActiveFeature = string | null;

/** Returns a memoized atom based on the initial feature. Changing the feature will not update the atom */
export const useFeatureAttributesActiveFeatureAtom = (
  feature: ActiveFeature = null,
): ActiveFeatureAtom =>
  useMemo(() => getFeatureAttributesActiveFeatureAtom(feature), [feature]);

export const getFeatureAttributesActiveFeatureAtom = (
  feature: ActiveFeature = null,
) => atom<ActiveFeature>(feature);
export type ActiveFeatureAtom = ReturnType<
  typeof getFeatureAttributesActiveFeatureAtom
>;
