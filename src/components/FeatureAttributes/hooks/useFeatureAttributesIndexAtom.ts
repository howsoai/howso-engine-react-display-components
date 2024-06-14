import { FeatureAttributes } from "@howso/openapi-client";
import { atomWithReset } from "jotai/utils";
import { useMemo } from "react";

export type FeatureAttributesIndex = Record<string, FeatureAttributes>;

export const useFeatureAttributesIndexAtom = (
  featuresAttributes: FeatureAttributesIndex,
): FeatureAttributesIndexAtom =>
  useMemo(
    () => getFeatureAttributesIndexAtom(featuresAttributes),
    [featuresAttributes],
  );

export const getFeatureAttributesIndexAtom = (
  featuresAttributes: FeatureAttributesIndex,
) => atomWithReset<FeatureAttributesIndex>(featuresAttributes);

export type FeatureAttributesIndexAtom = ReturnType<
  typeof getFeatureAttributesIndexAtom
>;
