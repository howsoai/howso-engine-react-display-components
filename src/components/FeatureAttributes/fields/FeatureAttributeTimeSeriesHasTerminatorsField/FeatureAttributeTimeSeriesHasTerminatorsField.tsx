import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesHasTerminatorsFieldI18nBundle as i18n } from "./FeatureAttributeTimeSeriesHasTerminatorsField.i18n";

export type FeatureAttributeTimeSeriesHasTerminatorsFieldProps = {
  isIdFeature: boolean | undefined;
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.series_has_terminators
 */
export const FeatureAttributeTimeSeriesHasTerminatorsField: FC<
  FeatureAttributeTimeSeriesHasTerminatorsFieldProps
> = ({ isIdFeature }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldCheckboxProps, purposes } = useContext(
    FeaturesAttributesContext,
  );
  const form = useFormContext();

  if (!isIdFeature || !purposes.includes("core")) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(i18n.strings.label)}
      {...form.register("time_series.series_has_terminators")}
      helperText={t(i18n.strings.help)}
    />
  );
};
