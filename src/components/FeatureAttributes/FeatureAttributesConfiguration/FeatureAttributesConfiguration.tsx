import { type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import {
  FeatureAttributeTypeField,
  FeatureAttributeUniqueField,
  FeatureAttributeSubtypeField,
  FeatureAttributeDataTypeField,
  FeatureAttributeIdFeatureField,
  FeatureAttributeIsSensitiveField,
  FeatureAttributeLocaleField,
  FeatureAttributeDateTimeFormatField,
  FeatureAttributeObservationalErrorField,
  FeatureAttributeNullIsDependentField,
} from "../fields";
import {
  FeatureAttributesContinuousNumbersGroup,
  FeatureAttributesBoundsGroup,
  FeatureAttributesProgrammableGroup,
  FeatureAttributesTemporalityGroup,
} from "../groups";
import { useFormValues } from "@/hooks/useFormValues";
import { type FeatureAttributesFieldsValues } from "./constants";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";

export interface FeatureAttributesConfigurationProps extends PropsWithChildren {
  className?: string;
  /** If any feature in the data has a time feature */
  featuresHaveTimeFeature: boolean;
}

/**
 * Allows the user to manipulate the type, data type, and dependent FeatureAttribute fields.
 */
export function FeatureAttributesConfiguration({
  children,
  className,
  featuresHaveTimeFeature,
}: FeatureAttributesConfigurationProps) {
  const values = useFormValues<FeatureAttributesFieldsValues>();
  const {
    type: featureType,
    data_type: dataType,
    id_feature: isIdFeature,
    date_time_format: dateTimeFormat,
    dependent_features: dependentFeatures,
    non_sensitive: nonSensitive,
    time_series: timeSeries,
  } = values;
  const isTimeFeature = timeSeries?.time_feature;

  return (
    <div className={twMerge(formSpacingYDefault, className)}>
      <FeatureAttributeTypeField />
      <FeatureAttributeDataTypeField featureType={featureType} />

      <FeatureAttributeDateTimeFormatField dataType={dataType} />
      <FeatureAttributeLocaleField dataType={dataType} />

      <FeatureAttributeIsSensitiveField
        featureType={featureType}
        dataType={dataType}
      />
      <FeatureAttributeSubtypeField
        featureType={featureType}
        dataType={dataType}
        nonSensitive={nonSensitive}
      />

      <FeatureAttributeIdFeatureField
        featureType={featureType}
        dataType={dataType}
      />
      <FeatureAttributeUniqueField
        featureType={featureType}
        dataType={dataType}
      />

      <FeatureAttributeObservationalErrorField
        featureType={featureType}
        dataType={dataType}
      />

      <FeatureAttributesBoundsGroup
        featureType={featureType}
        dataType={dataType}
        dateTimeFormat={dateTimeFormat}
      />
      <FeatureAttributeNullIsDependentField
        dependentFeatures={dependentFeatures}
      />

      <FeatureAttributesTemporalityGroup
        featuresHaveTimeFeature={featuresHaveTimeFeature}
        featureType={featureType}
        isIdFeature={isIdFeature}
        isTimeFeature={isTimeFeature}
        timeSeriesLags={timeSeries?.lags}
        timeSeriesOrder={timeSeries?.order}
        timeSeriesType={timeSeries?.type}
      />

      <FeatureAttributesContinuousNumbersGroup
        featureType={featureType}
        dataType={dataType}
      />

      <FeatureAttributesProgrammableGroup />
      {children}
    </div>
  );
}
