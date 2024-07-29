import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesOrderFieldIl8nBundle as il8n } from "./FeatureAttributeTimeSeriesOrderField.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeTimeSeriesOrderFieldProps = Partial<FieldTextProps>;
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.order
 */
export const FeatureAttributeTimeSeriesOrderField: FC<
  FeatureAttributeTimeSeriesOrderFieldProps
> = (props) => {
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
      {...form.register("time_series.order", { min: 0, valueAsNumber: true })}
      helperText={t(il8n.strings.help)}
    />
  );
};
