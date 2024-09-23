import { FeatureAttributes } from "@howso/engine";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeIdFeatureFieldI18nBundle as i18n } from "./FeatureAttributeIdFeatureField.i18n";

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
  const { t } = useTranslation(i18n.namespace);
  const { fieldCheckboxProps, purposes } = useContext(
    FeaturesAttributesContext,
  );
  const form = useFormContext();

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["nominal"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = [
    "string",
    "number",
  ];
  if (
    !featureType ||
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType) ||
    !purposes.includes("core")
  ) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(i18n.strings.label)}
      {...form.register("id_feature")}
      helperText={t(i18n.strings.help)}
    />
  );
};
