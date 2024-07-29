import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesDerivedOrdersFieldIl8nBundle as il8n } from "./FeatureAttributeTimeSeriesDerivedOrdersField.il8n";
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
      {...form.register("time_series.derived_orders", {
        min: 0,
        valueAsNumber: true,
      })}
      disabled={!!timeSeriesOrder}
      helperText={t(il8n.strings.help)}
    />
  );
};
