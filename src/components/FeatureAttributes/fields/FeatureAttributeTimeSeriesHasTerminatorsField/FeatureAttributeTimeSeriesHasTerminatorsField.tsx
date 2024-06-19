import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeTimeSeriesHasTerminatorsFieldProps = {
  isIdFeature: boolean | undefined;
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.series_has_terminators
 */
export const FeatureAttributeTimeSeriesHasTerminatorsField: FC<
  FeatureAttributeTimeSeriesHasTerminatorsFieldProps
> = ({ isIdFeature }) => {
  const { t } = useDefaultTranslation();
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  if (!isIdFeature) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesHasTerminatorsField.label",
      )}
      {...form.register("time_series.series_has_terminators")}
      helperText={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesHasTerminatorsField.help",
      )}
    />
  );
};
