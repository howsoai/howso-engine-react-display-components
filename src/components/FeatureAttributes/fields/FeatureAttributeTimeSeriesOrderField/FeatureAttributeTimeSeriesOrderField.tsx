import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesOrderFieldI18nBundle as i18n } from "./FeatureAttributeTimeSeriesOrderField.i18n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeTimeSeriesOrderFieldProps = Partial<FieldTextProps>;
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.order
 */
export const FeatureAttributeTimeSeriesOrderField: FC<
  FeatureAttributeTimeSeriesOrderFieldProps
> = (props) => {
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
      {...form.register("time_series.order", { min: 0, valueAsNumber: true })}
      helperText={t(i18n.strings.help)}
    />
  );
};
