import { FC } from "react";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import {
  FeatureAttributeTimeSeriesDeltaMinMaxFields,
  FeatureAttributeTimeSeriesDerivedOrdersField,
  FeatureAttributeTimeSeriesHasTerminatorsField,
  FeatureAttributeTimeSeriesLagsField,
  FeatureAttributeTimeSeriesNumLagsField,
  FeatureAttributeTimeSeriesOrderField,
  FeatureAttributeTimeSeriesRateMinMaxFields,
  FeatureAttributeTimeSeriesStopOnTerminatorsField,
  FeatureAttributeTimeSeriesTypeField,
} from "../../fields";
import { useDefaultTranslation } from "@/hooks";
import {
  FeatureAttributes,
  FeatureTimeSeriesTypeEnum,
} from "@howso/openapi-client";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributesTemporalityGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
> & {
  /** If any feature in the data has a time feature */
  featuresHaveTimeFeature: boolean;
  featureType: FeatureAttributes["type"];
  isIdFeature: boolean | undefined;
  /** time_series.time_feature */
  isTimeFeature: boolean | undefined;
  timeSeriesLags: number[] | undefined;
  timeSeriesOrder: number | undefined;
  timeSeriesType: FeatureTimeSeriesTypeEnum | undefined;
};
export const FeatureAttributesTemporalityGroup: FC<
  FeatureAttributesTemporalityGroupProps
> = ({
  featuresHaveTimeFeature,
  featureType,
  isIdFeature,
  isTimeFeature,
  timeSeriesLags,
  timeSeriesOrder,
  timeSeriesType,
  sizing,
  ...props
}) => {
  const { t } = useDefaultTranslation();

  if (!featuresHaveTimeFeature) {
    return null;
  }

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t("FeatureAttributes.FeatureAttributesTemporalityGroup.title")}
      advanced={
        <div className={formSpacingYDefault}>
          <FeatureAttributeTimeSeriesTypeField
            featureType={featureType}
            isTimeFeature={isTimeFeature}
            sizing={sizing}
          />
          <FeatureAttributeTimeSeriesDeltaMinMaxFields
            timeSeriesType={timeSeriesType}
            sizing={sizing}
          />
          <FeatureAttributeTimeSeriesRateMinMaxFields
            timeSeriesType={timeSeriesType}
            sizing={sizing}
          />
          {!isTimeFeature && (
            <>
              <FeatureAttributeTimeSeriesOrderField sizing={sizing} />
              <FeatureAttributeTimeSeriesDerivedOrdersField
                timeSeriesOrder={timeSeriesOrder}
                sizing={sizing}
              />
            </>
          )}
          <FeatureAttributeTimeSeriesLagsField sizing={sizing} />
          <FeatureAttributeTimeSeriesNumLagsField
            timeSeriesLags={timeSeriesLags}
            sizing={sizing}
          />
          <FeatureAttributeTimeSeriesHasTerminatorsField
            isIdFeature={isIdFeature}
          />
          <FeatureAttributeTimeSeriesStopOnTerminatorsField
            isIdFeature={isIdFeature}
          />
        </div>
      }
    />
  );
};
