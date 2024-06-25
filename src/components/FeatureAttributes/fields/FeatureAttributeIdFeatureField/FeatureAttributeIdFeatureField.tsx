import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeIdFeatureFieldProps = {
  featureType: FeatureAttributes["type"] | undefined;
  dataType: FeatureAttributes["data_type"];
};
/**
 * Conditions:
 * Feature type: nominal
 * Data type: string, number
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.id_feature
 */
export const FeatureAttributeIdFeatureField: FC<
  FeatureAttributeIdFeatureFieldProps
> = ({ featureType, dataType }) => {
  const { t } = useDefaultTranslation();
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["nominal"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = [
    "string",
    "number",
  ];
  if (
    !featureType ||
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t("FeatureAttributes.FeatureAttributeIdFeatureField.label")}
      {...form.register("id_feature")}
      helperText={t("FeatureAttributes.FeatureAttributeIdFeatureField.help")}
    />
  );
};
