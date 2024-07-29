import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { useTranslation } from "react-i18next";
import { FeatureAttributeTimeSeriesHasTerminatorsFieldIl8nBundle as il8n } from "./FeatureAttributeTimeSeriesHasTerminatorsField.il8n";

export type FeatureAttributeTimeSeriesHasTerminatorsFieldProps = {
  isIdFeature: boolean | undefined;
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.series_has_terminators
 */
export const FeatureAttributeTimeSeriesHasTerminatorsField: FC<
  FeatureAttributeTimeSeriesHasTerminatorsFieldProps
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
      {...form.register("time_series.series_has_terminators")}
      helperText={t(il8n.strings.help)}
    />
  );
};
