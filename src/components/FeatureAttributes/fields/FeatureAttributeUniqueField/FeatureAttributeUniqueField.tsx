import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeUniqueFieldProps = {
  featureType: FeatureAttributes["type"];
  dataType: FeatureAttributes["data_type"];
};
/**
 * Flag feature as only having unique values. Only applicable to nominals features.
 *
 * Conditions:
 * Feature type: Nominal
 * Data type: boolean
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.unique
 */
export const FeatureAttributeUniqueField: FC<
  FeatureAttributeUniqueFieldProps
> = ({ featureType, dataType }) => {
  const { t } = useDefaultTranslation();
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);

  const form = useFormContext();

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["nominal"];
  const unAllowedDataTypes: FeatureAttributes["data_type"][] = ["boolean"];
  if (
    !allowedFeatureTypes.includes(featureType) ||
    unAllowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t("FeatureAttributes.FeatureAttributeUniqueField.label")}
      {...form.register("unique")}
    />
  );
};
