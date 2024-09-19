import { FeatureAttributes } from "@howso/engine";
import {
  FieldCheckbox,
  FieldCheckboxProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeReservedTightTimeBoundFieldI18nBundle as i18n } from "./FeatureAttributeReservedTightTimeBoundField.i18n";

export type FeatureAttributeReservedTightTimeBoundFieldProps =
  Partial<FieldCheckboxProps> & {
    featureType: FeatureAttributes["type"] | undefined;
    isTimeFeature: boolean | undefined;
  };
/** Controls the InferFeatureAttributesParams.time_time_bounds parameter */
export const FeatureAttributeReservedTightTimeBoundField: FC<
  FeatureAttributeReservedTightTimeBoundFieldProps
> = ({ featureType, isTimeFeature }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldCheckboxProps, purposes } = useContext(
    FeaturesAttributesContext,
  );
  const form = useFormContext();

  if (
    !featureType ||
    featureType !== "continuous" ||
    !isTimeFeature ||
    !purposes.includes("core")
  ) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(i18n.strings.label)}
      {...form.register("reserved.tightTimeBounds")}
    />
  );
};
