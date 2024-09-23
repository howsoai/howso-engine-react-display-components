import { FeatureAttributes } from "@howso/engine";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeDecimalPlacesFieldI18nBundle as i18n } from "./FeatureAttributeDecimalPlacesField.i18n";

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
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextProps, purposes } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["continuous"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = ["number"];
  if (
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType) ||
    !purposes.includes("core")
  ) {
    return null;
  }

  return (
    <FieldText
      {...fieldTextProps}
      label={t(i18n.strings.label)}
      type="number"
      step="1"
      placeholder="2; 3; 17"
      {...props}
      {...form.register("decimal_places", { min: 0, valueAsNumber: true })}
      helperText={t(i18n.strings.help)}
    />
  );
};
