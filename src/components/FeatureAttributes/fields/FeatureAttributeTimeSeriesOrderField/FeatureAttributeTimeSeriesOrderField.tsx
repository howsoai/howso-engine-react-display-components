import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";

export type FeatureAttributeTimeSeriesOrderFieldProps = Partial<FieldTextProps>;
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.order
 */
export const FeatureAttributeTimeSeriesOrderField: FC<
  FeatureAttributeTimeSeriesOrderFieldProps
> = (props) => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();

  return (
    <FieldText
      type="number"
      label={t("FeatureAttributes.FeatureAttributeTimeSeriesOrderField.label")}
      placeholder="1"
      {...props}
      {...form.register("time_series.order", { min: 0, valueAsNumber: true })}
      helperText={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesOrderField.help",
      )}
    />
  );
};
