import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";

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
  const { t } = useDefaultTranslation();
  const form = useFormContext();

  return (
    <FieldText
      type="number"
      label={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesDerivedOrdersField.label",
      )}
      placeholder="1"
      {...props}
      {...form.register("time_series.derived_orders", {
        min: 0,
        valueAsNumber: true,
      })}
      disabled={!!timeSeriesOrder}
      helperText={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesDerivedOrdersField.help",
      )}
    />
  );
};
