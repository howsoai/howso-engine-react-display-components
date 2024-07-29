import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeSignificantDigitsFieldIl8nBundle as il8n } from "./FeatureAttributeSignificantDigitsField.il8n";
import { useTranslation } from "react-i18next";

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
      {...form.register("significant_digits", { min: 0, valueAsNumber: true })}
      helperText={t(il8n.strings.help)}
    />
  );
};
