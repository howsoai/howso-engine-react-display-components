import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributeIdFeatureFieldProps = {
  featureType: FeatureAttributes["type"];
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
  const form = useFormContext();

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["nominal"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = [
    "string",
    "number",
  ];
  if (
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  return (
    <FieldCheckbox
      label={t("FeatureAttributes.FeatureAttributeIdFeatureField.label")}
      {...form.register("id_feature")}
      helperText={t("FeatureAttributes.FeatureAttributeIdFeatureField.help")}
    />
  );
};
