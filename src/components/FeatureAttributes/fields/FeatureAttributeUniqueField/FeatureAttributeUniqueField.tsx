import { FeatureAttributes } from "@howso/engine";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeUniqueFieldI18nBundle as i18n } from "./FeatureAttributeUniqueField.i18n";

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
  const { t } = useTranslation(i18n.namespace);
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
      label={t(i18n.strings.label)}
      {...form.register("unique")}
    />
  );
};
