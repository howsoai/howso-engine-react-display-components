import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributeCycleLengthProps = Partial<FieldTextProps> & {
  featureType: FeatureAttributes["type"];
  dataType: FeatureAttributes["data_type"];
};
/**
 * Cyclic features start at 0 and have a range of [0, `cycle_length`].
 * The `cycle_length` is the maximum value (exclusive) of the cycle.
 *
 * Conditions:
 * Feature type: Continuous
 * Data type: Number
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.cycle_length
 */
export const FeatureAttributeCycleLengthField: FC<
  FeatureAttributeCycleLengthProps
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
      label={t("FeatureAttributes.FeatureAttributeCycleLengthField.label")}
      type="number"
      step="1"
      placeholder="1; 7; 365"
      {...props}
      {...form.register("cycle_length", { min: 0, valueAsNumber: true })}
      helperText={t("FeatureAttributes.FeatureAttributeCycleLengthField.help")}
    />
  );
};
