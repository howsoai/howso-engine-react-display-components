import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeNullIsDependentFieldI18nBundle as i18n } from "./FeatureAttributeNullIsDependentField.i18n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeNullIsDependentFieldProps = {
  dependentFeatures: FeatureAttributes["dependent_features"];
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.null_is_dependent
 */
export const FeatureAttributeNullIsDependentField: FC<
  FeatureAttributeNullIsDependentFieldProps
> = ({ dependentFeatures }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  if (!dependentFeatures?.length) {
    return null;
  }

  return (
    <FieldCheckbox
      {...fieldCheckboxProps}
      label={t(i18n.strings.label)}
      {...form.register("null_is_dependent")}
      helperText={
        <>
          {t(i18n.strings.help.dependencies)}: {dependentFeatures.join(", ")}
          <br />
          {t(i18n.strings.help.description)}
        </>
      }
    />
  );
};
