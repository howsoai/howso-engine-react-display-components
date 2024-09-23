import { FeatureAttributes } from "@howso/engine";
import {
  FieldSelect,
  FieldSelectProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesTypeFieldI18nBundle as i18n } from "./FeatureAttributeTimeSeriesTypeField.i18n";

export type FeatureAttributeTimeSeriesTypeFieldProps =
  Partial<FieldSelectProps> & {
    featureType: FeatureAttributes["type"] | undefined;
    /** Is this the time feature that acts as the unique identifier for a time series */
    isTimeFeature: boolean | undefined;
  };
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.type
 */
export const FeatureAttributeTimeSeriesTypeField: FC<
  FeatureAttributeTimeSeriesTypeFieldProps
> = ({ featureType, isTimeFeature, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldSelectProps, purposes } = useContext(FeaturesAttributesContext);
  const form = useFormContext();
  if (!purposes.includes("core")) {
    return null;
  }

  const required = false;

  const rateTypes: FeatureAttributes["type"][] = ["continuous", "ordinal"];
  const deltaTypes: FeatureAttributes["type"][] = [
    "continuous",
    "nominal",
    "ordinal",
  ];

  return (
    <FieldSelect
      {...fieldSelectProps}
      label={t(i18n.strings.label)}
      required={required}
      {...props}
      {...form.register("time_series.type", {
        required,
        value: isTimeFeature ? "delta" : "rate",
      })}
      disabled={isTimeFeature}
      helperText={t(i18n.strings.help)}
    >
      <option value=""></option>
      {featureType && rateTypes.includes(featureType) && (
        <option value="rate">{t(i18n.strings.options.rate)}</option>
      )}
      {featureType && deltaTypes.includes(featureType) && (
        <option value="delta">{t(i18n.strings.options.delta)}</option>
      )}
    </FieldSelect>
  );
};
