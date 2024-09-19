import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesNumLagsFieldI18nBundle as i18n } from "./FeatureAttributeTimeSeriesNumLagsField.i18n";

export type FeatureAttributeTimeSeriesNumLagsFieldProps =
  Partial<FieldTextProps> & {
    timeSeriesLags: number[] | undefined;
  };
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.num_lags
 */
export const FeatureAttributeTimeSeriesNumLagsField: FC<
  FeatureAttributeTimeSeriesNumLagsFieldProps
> = ({ timeSeriesLags, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextProps, purposes } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  if (!purposes.includes("core")) {
    return null;
  }

  return (
    <FieldText
      {...fieldTextProps}
      type="number"
      label={t(i18n.strings.label)}
      placeholder="1"
      {...props}
      {...form.register("time_series.num_lags", {
        min: 0,
        valueAsNumber: true,
      })}
      disabled={!!timeSeriesLags?.length}
      helperText={t(i18n.strings.help)}
    />
  );
};
