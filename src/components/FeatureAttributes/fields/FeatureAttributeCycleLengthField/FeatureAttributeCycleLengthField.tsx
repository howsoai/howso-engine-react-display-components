import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { useTranslation } from "react-i18next";
import { FeatureAttributeCycleLengthFieldIl8nBundle as il8n } from "./FeatureAttributeCycleLengthField.il8n";

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
  const { t } = useTranslation(il8n.namespace);
  const form = useFormContext();
  const { fieldTextProps } = useContext(FeaturesAttributesContext);

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
      placeholder="1; 7; 365"
      {...props}
      {...form.register("cycle_length", { min: 0, valueAsNumber: true })}
      helperText={t(il8n.strings.help)}
    />
  );
};
