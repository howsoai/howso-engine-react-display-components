import type { FeatureAttributes, FeatureType } from "@howso/engine";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
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
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import { testId } from "./constants";
import { FeatureAttributesTemporalityGroupI18nBundle as i18n } from "./FeatureAttributesTemporalityGroup.i18n";

export type FeatureAttributesTemporalityGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
> & {
  /** If any feature in the data has a time feature */
  featuresHaveTimeFeature: boolean;
  featureType: FeatureType | undefined;
  isIdFeature: boolean | undefined;
  /** time_series.time_feature */
  isTimeFeature: boolean | undefined;
  timeSeriesLags: number[] | undefined;
  timeSeriesOrder: number | undefined;
  timeSeriesType:
    | NonNullable<FeatureAttributes["time_series"]>["type"]
    | undefined;
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
  ...props
}) => {
  const { t } = useTranslation(i18n.namespace);
  const { purposes } = useContext(FeaturesAttributesContext);

  if (!featuresHaveTimeFeature || !purposes.includes("core")) {
    return null;
  }

  return (
    <FeatureAttributesGroupBase
      {...props}
      data-testid={testId}
      title={t(i18n.strings.title)}
      advanced={
        <div className={formSpacingYDefault}>
          <FeatureAttributeTimeSeriesTypeField
            featureType={featureType}
            isTimeFeature={isTimeFeature}
          />
          <FeatureAttributeTimeSeriesDeltaMinMaxFields
            timeSeriesType={timeSeriesType}
          />
          <FeatureAttributeTimeSeriesRateMinMaxFields
            timeSeriesType={timeSeriesType}
          />
          {!isTimeFeature && (
            <>
              <FeatureAttributeTimeSeriesOrderField />
              <FeatureAttributeTimeSeriesDerivedOrdersField
                timeSeriesOrder={timeSeriesOrder}
              />
            </>
          )}
          <FeatureAttributeTimeSeriesLagsField />
          <FeatureAttributeTimeSeriesNumLagsField
            timeSeriesLags={timeSeriesLags}
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
