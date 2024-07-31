import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesDerivedOrdersFieldI18nBundle as i18n } from "./FeatureAttributeTimeSeriesDerivedOrdersField.i18n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeTimeSeriesDerivedOrdersFieldProps =
  Partial<FieldTextProps> & {
    timeSeriesOrder: number | undefined;
  };
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.derived_orders
 */
export const FeatureAttributeTimeSeriesDerivedOrdersField: FC<
  FeatureAttributeTimeSeriesDerivedOrdersFieldProps
> = ({ timeSeriesOrder, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  return (
    <FieldText
      {...fieldTextProps}
      type="number"
      label={t(i18n.strings.label)}
      placeholder="1"
      {...props}
      {...form.register("time_series.derived_orders", {
        min: 0,
        valueAsNumber: true,
      })}
      disabled={!!timeSeriesOrder}
      helperText={t(i18n.strings.help)}
    />
  );
};
