import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeUniqueFieldIl8nBundle as il8n } from "./FeatureAttributeUniqueField.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeUniqueFieldProps = {
  featureType: FeatureAttributes["type"] | undefined;
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
  const { t } = useTranslation(il8n.namespace);
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);

  const form = useFormContext();

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["nominal"];
  const unAllowedDataTypes: FeatureAttributes["data_type"][] = ["boolean"];
  if (
    !featureType ||
    !allowedFeatureTypes.includes(featureType) ||
    unAllowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(il8n.strings.label)}
      {...form.register("unique")}
    />
  );
};
