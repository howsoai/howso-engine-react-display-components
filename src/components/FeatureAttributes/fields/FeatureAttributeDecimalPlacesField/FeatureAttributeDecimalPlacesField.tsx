import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeDecimalPlacesFieldIl8nBundle as il8n } from "./FeatureAttributeDecimalPlacesField.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeDecimalPlacesProps = Partial<FieldTextProps> & {
  featureType: FeatureAttributes["type"];
  dataType: FeatureAttributes["data_type"];
};
/**
 * Decimal places to round to, default is no rounding.
 * If significant_digits is also specified, the number will be rounded to the specified number
 * of significant digits first, then rounded to the number of decimal points as specified by this parameter.
 *
 * Conditions:
 * Feature type: Continuous
 * Data type: Number
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.significant_digits
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.decimal_places
 */
export const FeatureAttributeDecimalPlacesField: FC<
  FeatureAttributeDecimalPlacesProps
> = ({ featureType, dataType, ...props }) => {
  const { t } = useTranslation(il8n.namespace);
  const { fieldTextProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["continuous"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = ["number"];
  if (
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  return (
    <FieldText
      {...fieldTextProps}
      label={t(il8n.strings.label)}
      type="number"
      step="1"
      placeholder="2; 3; 17"
      {...props}
      {...form.register("decimal_places", { min: 0, valueAsNumber: true })}
      helperText={t(il8n.strings.help)}
    />
  );
};
