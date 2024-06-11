import { atomWithReset } from "jotai/utils";
import { useMemo } from "react";

// Feature attributes options
export type FeatureOptions = {
  time_series?: boolean;
};

export const useFeatureAttributesOptionsAtom = (options: FeatureOptions) =>
  useMemo(() => getFeatureAttributesOptionsAtom(options), [options]);

export const getFeatureAttributesOptionsAtom = (options: FeatureOptions) =>
  atomWithReset<FeatureOptions>(options);
export type FeatureOptionsAtom = ReturnType<
  typeof getFeatureAttributesOptionsAtom
>;
