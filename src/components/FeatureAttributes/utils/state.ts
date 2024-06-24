import type {
  FeatureAttributes,
  FeatureOriginalType,
} from "@howso/openapi-client";
import { isFeatureAttributeSensitiveAttributeAvailable } from "../fields/FeatureAttributeIsSensitiveField";
import type { InferFeatureAttributesOptions } from "../types/api";
import { FeatureAttributesIndex, type DirtyFeatureAttributes } from "../hooks";

export type FeatureAttributesConfigurationIssuesIndex = Record<
  string,
  FeatureAttributesConfigurationIssue[]
>;
export const getAllFeatureAttributeConfigurationIssues = (
  featuresAttributesIndex: FeatureAttributesIndex,
): FeatureAttributesConfigurationIssuesIndex | undefined => {
  const issuesIndex = Object.entries(featuresAttributesIndex).reduce(
    (issuesIndex, [feature, attributes]) => {
      const issues = getFeatureAttributeConfigurationIssues(attributes);
      if (issues) {
        issuesIndex[feature] = issues;
      }
      return issuesIndex;
    },
    {} as FeatureAttributesConfigurationIssuesIndex,
  );

  const length = Object.keys(issuesIndex).length;
  return length > 0 ? issuesIndex : undefined;
};

export const areAllFeatureAttributesValid = (
  featuresAttributesIndex: FeatureAttributesIndex,
): boolean => {
  const hasInvalid = Object.values(featuresAttributesIndex).some(
    (attributes) => {
      const issues = getFeatureAttributeConfigurationIssues(attributes);
      return issues !== undefined;
    },
  );
  return !hasInvalid;
};

export type FeatureAttributesConfigurationIssue = {
  translationKey: `FeatureAttributes.ConfigurationIssue.${string}`;
};

const featureAttributeIssues: Record<
  string,
  FeatureAttributesConfigurationIssue
> = {
  typeUndefined: {
    translationKey: `FeatureAttributes.ConfigurationIssue.typeUndefined`,
  },
  dataTypeUndefined: {
    translationKey: `FeatureAttributes.ConfigurationIssue.dataTypeUndefined`,
  },
  sensitiveSubtypeUndefined: {
    translationKey: `FeatureAttributes.ConfigurationIssue.sensitiveSubtypeUndefined`,
  },
  dateTimeFormatUndefined: {
    translationKey: `FeatureAttributes.ConfigurationIssue.dateTimeFormatUndefined`,
  },
};

export const getFeatureAttributeConfigurationIssues = (
  featureAttributes: FeatureAttributes,
): FeatureAttributesConfigurationIssue[] | undefined => {
  const issues: FeatureAttributesConfigurationIssue[] = [];

  if (!featureAttributes.type) {
    issues.push(featureAttributeIssues.typeUndefined);
  }

  if (!featureAttributes.data_type) {
    issues.push(featureAttributeIssues.dataTypeUndefined);
  }

  if (isFeatureAttributeSensitiveAttributeAvailable(featureAttributes)) {
    const isSensitive = !featureAttributes.non_sensitive;
    if (isSensitive && !featureAttributes.subtype) {
      issues.push(featureAttributeIssues.sensitiveSubtypeUndefined);
    }
  }

  if (
    featureAttributes.data_type === "formatted_date_time" &&
    !featureAttributes.date_time_format
  ) {
    issues.push(featureAttributeIssues.sensitiveSubtypeUndefined);
  }

  return issues.length ? issues : undefined;
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
  const isContinuous = attributes.type === "continuous";
  const data_type = getDataTypeFromFeatureAttributes(attributes);
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
