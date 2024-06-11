import { FeatureAttributes } from "@howso/openapi-client";
import { atom } from "jotai";
import { useMemo } from "react";
import { FieldNamesMarkedBoolean } from "react-hook-form";

export type DirtyFeatureAttributes = Partial<
  FieldNamesMarkedBoolean<FeatureAttributes>
>;
/* Memoized boolean atom have been modified and require re-run of infer */
export const useFeatureAttributesAreDirtyAtom = (
  isDirty: boolean = false,
): FeaturesDirtyAtom =>
  useMemo(() => getFeatureAttributesAreDirtyAtom(isDirty), [isDirty]);

/* Boolean atom have been modified and require re-run of infer */
export const getFeatureAttributesAreDirtyAtom = (isDirty: boolean = false) =>
  atom(isDirty);
export type FeaturesDirtyAtom = ReturnType<
  typeof getFeatureAttributesAreDirtyAtom
>;
