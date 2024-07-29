import {
  FieldCheckbox,
  FieldCheckboxProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributes } from "@howso/openapi-client";
import { FeatureAttributeReservedTightTimeBoundFieldIl8nBundle as il8n } from "./FeatureAttributeReservedTightTimeBoundField.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeReservedTightTimeBoundFieldProps =
  Partial<FieldCheckboxProps> & {
    featureType: FeatureAttributes["type"] | undefined;
    isTimeFeature: boolean | undefined;
  };
/** Controls the InferFeatureAttributesParams.time_time_bounds parameter */
export const FeatureAttributeReservedTightTimeBoundField: FC<
  FeatureAttributeReservedTightTimeBoundFieldProps
> = ({ featureType, isTimeFeature }) => {
  const { t } = useTranslation(il8n.namespace);
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);

  const form = useFormContext();

  if (!featureType || featureType !== "continuous" || !isTimeFeature) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(il8n.strings.label)}
      {...form.register("reserved.tightTimeBounds")}
    />
  );
};
