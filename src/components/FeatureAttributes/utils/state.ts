import {
  FeatureAttributes,
  FeatureOriginalType,
  FeatureTimeSeries,
} from "@howso/openapi-client";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { isFeatureAttributeSensitiveAttributeAvailable } from "../fields";
import { isEmpty } from "@/utils";
import { InferFeatureAttributesOptions } from "../types/api";
import { FieldNamesMarkedBoolean } from "react-hook-form";

export type DirtyFeatureAttributes = Partial<
  FieldNamesMarkedBoolean<FeatureAttributes>
>;

export const getFeaturesDirtyAtom = (isDirty: boolean = false) => atom(isDirty);
// If features have been modified and require re-run of infer
export const featuresDirtyAtom = getFeaturesDirtyAtom();
export type FeaturesDirtyAtom = typeof featuresDirtyAtom;

export type FeatureAttributesIndex = Record<string, FeatureAttributes>;
export const getFeaturesAttributesIndexAtom = (
  featuresAttributes: FeatureAttributesIndex,
) => atomWithReset<FeatureAttributesIndex>(featuresAttributes);
// Features and their attributes
export const featureAttributesIndexAtom = getFeaturesAttributesIndexAtom({});
export type FeatureAttributesIndexAtom = typeof featureAttributesIndexAtom;

export type SetFeatureAttributesAtomParams = {
  featureAttributesIndexAtom: FeatureAttributesIndexAtom;
  featuresDirtyAtom: FeaturesDirtyAtom;
};
export const getSetFeatureAttributesAtom = ({
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

export const setFeatureAttributesAtom = getSetFeatureAttributesAtom({
  featureAttributesIndexAtom: featureAttributesIndexAtom,
  featuresDirtyAtom,
});
export type SetFeatureAttributesAtom = typeof setFeatureAttributesAtom;

export type ActiveFeature = string | null;
export const getActiveFeatureAtom = (feature: ActiveFeature = null) =>
  atom<ActiveFeature>(feature);
// Defines the feature the user is currently reviewing
export const activeFeatureAtom = getActiveFeatureAtom();
export type ActiveFeatureAtom = typeof activeFeatureAtom;

// List of all feature names
export const featuresAtom = atomWithReset<string[]>([]);

export type GetTimeFeatureAtomParams = {
  featureAttributesIndexAtom: FeatureAttributesIndexAtom;
  featuresDirtyAtom: FeaturesDirtyAtom;
};
export const getTimeFeatureAtom = ({
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
/*
 * Derived atom to get/set the time feature in feature attributes
 * Causes dirty atom to be tripped when set.
 */
export const timeFeatureAtom = getTimeFeatureAtom({
  featureAttributesIndexAtom: featureAttributesIndexAtom,
  featuresDirtyAtom,
});
export type TimeFeatureAtom = typeof timeFeatureAtom;

// Feature attributes options
export type FeatureOptions = {
  time_series?: boolean;
};
export const getFeaturesOptionsAtom = (options: FeatureOptions) =>
  atomWithReset<FeatureOptions>(options);
export const featureOptionsAtom = atomWithReset<FeatureOptions>({});
export type FeatureOptionsAtom = typeof featureOptionsAtom;

export const areAllFeatureAttributesValid = (
  featuresAttributes: FeatureAttributes[],
): boolean => {
  const hasInvalid = featuresAttributes.some((attributes) => {
    const isValid = areFeatureAttributesValid(attributes);
    return !isValid;
  });
  return !hasInvalid;
};

export const areFeatureAttributesValid = (
  attributes: FeatureAttributes,
): boolean => {
  if (!attributes.type) {
    return false;
  }

  if (!attributes.data_type) {
    return false;
  }

  if (isFeatureAttributeSensitiveAttributeAvailable(attributes)) {
    const isSensitive = !attributes.non_sensitive;
    if (isSensitive && !attributes.subtype) {
      return false;
    }
  }

  switch (true) {
    case attributes.data_type === "formatted_date_time" &&
      !attributes.date_time_format:
      return false;
    default:
      return true;
  }
};

/**
 * Check for sensitive nominal feature.
 * @param attributes A single feature's attributes.
 * @returns True if the feature is nominal and sensitive.
 */
export function isSensitiveNominal(attributes: FeatureAttributes) {
  if (attributes == null) return false;
  return (
    !attributes.non_sensitive &&
    ["nominal", "ordinal"].includes(attributes.type)
  );
}

export const getFeatureAttributesForType = (
  attributes: FeatureAttributes,
): FeatureAttributes => {
  attributes.type ||= "continuous";
  const isContinuous = attributes.type === "continuous";
  const data_type = getDataTypeFromFeatureAttributes(attributes) || "string";
  return {
    ...attributes,
    type: attributes.type,
    // Reset fields on change
    id_feature: isContinuous ? undefined : attributes.id_feature,
    data_type,
    decimal_places:
      data_type === "number" ? attributes.decimal_places : undefined,
  };
};

/**
 * Determines the data type based off all available attribute data
 */
export const getDataTypeFromFeatureAttributes = (
  attributes: FeatureAttributes | undefined,
): FeatureAttributes["data_type"] => {
  if (attributes?.data_type) {
    return attributes.data_type;
  }
  if (attributes?.original_type?.data_type) {
    return getDataTypeFromOriginalType(attributes.original_type);
  }
  if (attributes?.type === "continuous") {
    return "number";
  }
  return undefined;
};

const getDataTypeFromOriginalType = (
  original: FeatureOriginalType,
): FeatureAttributes["data_type"] => {
  switch (original.data_type) {
    case "integer":
    case "numeric":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "string";
  }
};

export const getInferFeatureAttributesConfigParameters = (
  config: Partial<InferFeatureAttributesOptions> = {},
): InferFeatureAttributesOptions => ({
  ...config,
  include_sample: true,
});

/**
 * Return if infer-feature-attributes should be re-run given modified feature attributes.
 * @param fields Changed fields.
 * @returns True if infer should be re-run.
 */
export function shouldInferAgain(fields: DirtyFeatureAttributes) {
  if (fields == null) return false;
  for (const field of Object.keys(fields)) {
    // These fields do not require re-run of infer feature attributes
    if (field === "bounds") continue;
    if (field === "cycle_length") continue;
    if (field === "dependent_features") continue;
    if (field === "derived_feature_code") continue;
    if (field === "post_process") continue;
    if (field === "non_sensitive") continue;
    if (field === "null_is_dependent") continue;
    if (field === "observational_error") continue;
    if (field === "original_type") continue;
    if (field === "original_format") continue;
    // Field that requires re-run
    return true;
  }
  return false;
}
