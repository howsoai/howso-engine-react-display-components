import { type FC, type ReactNode } from "react";
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
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { InferFeatureAttributeFormValues } from "../utils";

export type FeatureAttributesConfigurationProps = {
  className?: string;
  children?: ReactNode;
  /** If any feature in the data has a time feature */
  featuresHaveTimeFeature: boolean;
};

/**
 * Allows the user to manipulate the type, data type, and dependent FeatureAttribute fields.
 */
export const FeatureAttributesConfiguration: FC<
  FeatureAttributesConfigurationProps
> = ({ children, className, featuresHaveTimeFeature }) => {
  const values = useFormValues<InferFeatureAttributeFormValues>();
  const {
    type: featureType,
    data_type: dataType,
    id_feature: isIdFeature,
    date_time_format: dateTimeFormat,
    dependent_features: dependentFeatures,
    non_sensitive: nonSensitive,
    reserved,
    time_series: timeSeries,
  } = values;
  const isTimeFeature = timeSeries?.time_feature;
  const { boundingMode } = reserved || {};

  return (
    <div className={twMerge(formSpacingYDefault, className)}>
      <FeatureAttributeTypeField fieldType="radios" />
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
        boundingMode={boundingMode}
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
};
