import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesStopOnTerminatorsFieldIl8nBundle as il8n } from "./FeatureAttributeTimeSeriesStopOnTerminatorsField.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeTimeSeriesStopOnTerminatorsFieldProps = {
  isIdFeature: boolean | undefined;
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.stop_on_terminator
 */
export const FeatureAttributeTimeSeriesStopOnTerminatorsField: FC<
  FeatureAttributeTimeSeriesStopOnTerminatorsFieldProps
> = ({ isIdFeature }) => {
  const { t } = useTranslation(il8n.namespace);
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  if (!isIdFeature) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(il8n.strings.label)}
      {...form.register("time_series.stop_on_terminator")}
      helperText={t(il8n.strings.help)}
    />
  );
};
