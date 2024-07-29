import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeIdFeatureFieldIl8nBundle as il8n } from "./FeatureAttributeIdFeatureField.il8n";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(il8n.namespace);
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
      label={t(il8n.strings.label)}
      {...form.register("id_feature")}
      helperText={t(il8n.strings.help)}
    />
  );
};
