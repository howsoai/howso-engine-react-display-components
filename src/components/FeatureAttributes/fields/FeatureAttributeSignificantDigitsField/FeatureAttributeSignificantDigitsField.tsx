import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";

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
  const { t } = useDefaultTranslation();
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
      label={t(
        "FeatureAttributes.FeatureAttributeSignificantDigitsField.label",
      )}
      type="number"
      step="1"
      placeholder="2; 3; 17"
      {...props}
      {...form.register("significant_digits", { min: 0, valueAsNumber: true })}
      helperText={t(
        "FeatureAttributes.FeatureAttributeSignificantDigitsField.help",
      )}
    />
  );
};
