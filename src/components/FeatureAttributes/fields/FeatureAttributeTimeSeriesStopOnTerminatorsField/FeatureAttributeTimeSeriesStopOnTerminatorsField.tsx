import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";

export type FeatureAttributeTimeSeriesStopOnTerminatorsFieldProps = {
  isIdFeature: boolean | undefined;
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.stop_on_terminator
 */
export const FeatureAttributeTimeSeriesStopOnTerminatorsField: FC<
  FeatureAttributeTimeSeriesStopOnTerminatorsFieldProps
> = ({ isIdFeature }) => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();

  if (!isIdFeature) {
    return null;
  }

  return (
    <FieldCheckbox
      label={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesStopOnTerminatorsField.label",
      )}
      {...form.register("time_series.stop_on_terminator")}
      helperText={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesStopOnTerminatorsField.help",
      )}
    />
  );
};
