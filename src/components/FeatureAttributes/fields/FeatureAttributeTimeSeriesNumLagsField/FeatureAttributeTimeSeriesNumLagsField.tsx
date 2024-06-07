import { FieldText } from "@howso/react-tailwind-flowbite-components";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";

export type FeatureAttributeTimeSeriesNumLagsFieldProps = {
  timeSeriesLags: number[] | undefined;
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.num_lags
 */
export const FeatureAttributeTimeSeriesNumLagsField: FC<
  FeatureAttributeTimeSeriesNumLagsFieldProps
> = ({ timeSeriesLags }) => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();

  return (
    <FieldText
      type="number"
      label={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesNumLagsField.label",
      )}
      placeholder="1"
      {...form.register("time_series.num_lags", {
        min: 0,
        valueAsNumber: true,
      })}
      disabled={!!timeSeriesLags?.length}
      helperText={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesNumLagsField.help",
      )}
    />
  );
};