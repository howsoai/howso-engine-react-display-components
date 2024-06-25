import type { FeatureAttributes } from "@howso/openapi-client";

export type FeatureAttributesIndex = Record<string, FeatureAttributes>;

/** Options available to the InferFeatureAttributes call in the platform API */
export interface InferFeatureAttributesParams {
  // Initial feature attributes to build onto.
  features?: FeatureAttributesIndex;
  // Defaults to true, set to false to disable inferring bounds.
  infer_bounds?: boolean;
  // Use tight min and max bounds for the features specified.
  tight_bounds?: string[];
  /** Include non-null sample values on attributes */
  include_sample?: boolean;
  // Explicit list of feature names to use mode bounds for when inferring loose bounds
  // If unspecified uses all features.
  mode_bound_features?: string[];
  // Names of features to use as ID features.
  id_feature_name?: string | string[];
  // Feature name to datetime format or [format, locale].
  datetime_feature_formats?: Record<string, string | [string, string]>;
  // Feature name to allowed ordinal values.
  ordinal_feature_values?: Record<string, string[]>;
  // Feature name to dependent feature names.
  dependent_features?: Record<string, string[]>;

  // Nominal Substitution
  // ====================
  // Enable inferring extended nominals.
  attempt_infer_extended_nominals?: boolean;
  // Extended nominal probabilities will be appended as metadata into the feature object.
  include_extended_nominal_probabilities?: boolean;
  // Configuration of the nominal substitution engine.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nominal_substitution_config?: Record<string, any>;

  // Time Series
  // ===========
  // The name of the time feature.
  time_feature_name?: string;
  // Names of time-invariant features.
  time_invariant_features?: string[];
  // Enables tight bounds for time_feature.
  // Bounds for the start and end times will be set to the same bounds as
  // observed in the original data.
  tight_time_bounds?: boolean;
  // If true (default) the time feature will be treated as universal and
  // future data is excluded while making predictions. If False, the time
  // feature will not be treated as universal and only future data within the
  // same series is excluded while making predictions.
  time_feature_is_universal?: boolean;
  // Type specifying how time series is generated.
  time_series_type_default?: "rate" | "delta";
  // Feature name to time series type override.
  time_series_types_override?: Record<string, "rate" | "delta">;
  // Feature name to corresponding order of derivatives for specified type (delta/rate).
  orders_of_derivatives?: Record<string, number>;
  // Feature name to number of orders of derivatives that should be derived instead of synthesized.
  derived_orders?: Record<string, number>;
  // Number of lags for all features or by feature name.
  num_lags?: number | Record<string, number>;
}
