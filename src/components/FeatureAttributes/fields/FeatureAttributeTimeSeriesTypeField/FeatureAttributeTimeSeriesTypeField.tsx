import { FC } from "react";
import { useDefaultTranslation } from "@/hooks";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import { FieldSelect } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributeTimeSeriesTypeFieldProps = {
  featureType: FeatureAttributes["type"];
  /** Is this the time feature that acts as the unique identifier for a time series */
  isTimeFeature: boolean | undefined;
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.type
 */
export const FeatureAttributeTimeSeriesTypeField: FC<
  FeatureAttributeTimeSeriesTypeFieldProps
> = ({ featureType, isTimeFeature }) => {
  const { t } = useDefaultTranslation();
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
      label={t("FeatureAttributes.FeatureAttributeTimeSeriesTypeField.label")}
      required={required}
      {...form.register("time_series.type", {
        required,
        value: isTimeFeature ? "delta" : "rate",
      })}
      disabled={isTimeFeature}
      helperText={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesTypeField.help",
      )}
    >
      <option value=""></option>
      {rateTypes.includes(featureType) && (
        <option value="rate">
          {t(
            "FeatureAttributes.FeatureAttributeTimeSeriesTypeField.options.rate",
          )}
        </option>
      )}
      {deltaTypes.includes(featureType) && (
        <option value="delta">
          {t(
            "FeatureAttributes.FeatureAttributeTimeSeriesTypeField.options.delta",
          )}
        </option>
      )}
    </FieldSelect>
  );
};
