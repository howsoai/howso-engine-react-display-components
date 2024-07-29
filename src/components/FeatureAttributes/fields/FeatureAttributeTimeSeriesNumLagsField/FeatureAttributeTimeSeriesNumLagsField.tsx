import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesNumLagsFieldIl8nBundle as il8n } from "./FeatureAttributeTimeSeriesNumLagsField.il8n";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(il8n.namespace);
  const { fieldTextProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  return (
    <FieldText
      {...fieldTextProps}
      type="number"
      label={t(il8n.strings.label)}
      placeholder="1"
      {...props}
      {...form.register("time_series.num_lags", {
        min: 0,
        valueAsNumber: true,
      })}
      disabled={!!timeSeriesLags?.length}
      helperText={t(il8n.strings.help)}
    />
  );
};
