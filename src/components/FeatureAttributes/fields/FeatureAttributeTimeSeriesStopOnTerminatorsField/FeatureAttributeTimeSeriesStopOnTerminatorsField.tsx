import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesStopOnTerminatorsFieldI18nBundle as i18n } from "./FeatureAttributeTimeSeriesStopOnTerminatorsField.i18n";

export type FeatureAttributeTimeSeriesStopOnTerminatorsFieldProps = {
  isIdFeature: boolean | undefined;
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.stop_on_terminator
 */
export const FeatureAttributeTimeSeriesStopOnTerminatorsField: FC<
  FeatureAttributeTimeSeriesStopOnTerminatorsFieldProps
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
      {...form.register("time_series.stop_on_terminator")}
      helperText={t(i18n.strings.help)}
    />
  );
};
