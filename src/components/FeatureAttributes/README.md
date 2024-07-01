# Introduction

Use the [enterprise docs](https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html) for the most up to date and compressive information.

## Logical flow

Users will be expected to run a naive `infer_feature_attributes(df, **params)` to get an original list of features.
This initial list of features, and any params will be provided to the `FeaturesAttributes*` widgets for further configuration.

The mutated context and features should be used to inform further `infer_feature_attributes(df, **params)` runs
by mutating the `**params` based on configuration changes in by the user.

## Integration

All fields will be expecting a `<FormProvider {...form}>`.
