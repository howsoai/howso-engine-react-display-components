import {
  FieldCheckbox,
  FieldCheckboxProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";

export type FeatureAttributeReservedTightTimeBoundFieldProps =
  Partial<FieldCheckboxProps> & {
    featureType: FeatureAttributes["type"] | undefined;
    isTimeFeature: boolean | undefined;
  };
/** Controls the InferFeatureAttributesParams.time_time_bounds parameter */
export const FeatureAttributeReservedTightTimeBoundField: FC<
  FeatureAttributeReservedTightTimeBoundFieldProps
> = ({ featureType, isTimeFeature }) => {
  const { t } = useDefaultTranslation();
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);

  const form = useFormContext();

  if (!featureType || featureType !== "continuous" || !isTimeFeature) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(
        "FeatureAttributes.FeatureAttributeReservedTightTimeBoundField.label",
      )}
      {...form.register("reserved.tightTimeBounds")}
    />
  );
};
