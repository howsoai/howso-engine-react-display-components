import { FeatureAttributes } from "@howso/engine";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeSignificantDigitsFieldI18nBundle as i18n } from "./FeatureAttributeSignificantDigitsField.i18n";

export type FeatureAttributeSignificantDigitsFieldProps =
  Partial<FieldTextProps> & {
    featureType: FeatureAttributes["type"];
    dataType: FeatureAttributes["data_type"];
  };
/**
 * Round to the specified significant digits, default is no rounding.
 * The number of significant digits is the number of all digits ignoring the decimal point,
 * and ignoring all leading zeros and some trailing zeros.
 *
 * Conditions:
 * Feature type: Continuous
 * Data type: Number
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.significant_digits
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.decimal_places
 */
export const FeatureAttributeSignificantDigitsField: FC<
  FeatureAttributeSignificantDigitsFieldProps
> = ({ featureType, dataType, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
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
      label={t(i18n.strings.label)}
      type="number"
      step="1"
      placeholder="2; 3; 17"
      {...props}
      {...form.register("significant_digits", { min: 0, valueAsNumber: true })}
      helperText={t(i18n.strings.help)}
    />
  );
};
