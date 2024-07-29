import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FieldSelect,
  FieldSelectProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { useTranslation } from "react-i18next";
import { FeatureAttributeTimeSeriesTypeFieldIl8nBundle as il8n } from "./FeatureAttributeTimeSeriesTypeField.il8n";

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
  const { t } = useTranslation(il8n.namespace);
  const { fieldSelectProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();
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
      label={t(il8n.strings.label)}
      required={required}
      {...props}
      {...form.register("time_series.type", {
        required,
        value: isTimeFeature ? "delta" : "rate",
      })}
      disabled={isTimeFeature}
      helperText={t(il8n.strings.help)}
    >
      <option value=""></option>
      {featureType && rateTypes.includes(featureType) && (
        <option value="rate">{t(il8n.strings.options.rate)}</option>
      )}
      {featureType && deltaTypes.includes(featureType) && (
        <option value="delta">{t(il8n.strings.options.delta)}</option>
      )}
    </FieldSelect>
  );
};
