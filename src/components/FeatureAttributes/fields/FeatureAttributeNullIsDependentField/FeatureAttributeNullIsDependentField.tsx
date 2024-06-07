import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { useDefaultTranslation } from "@/hooks";

export type FeatureAttributeNullIsDependentFieldProps = {
  dependentFeatures: FeatureAttributes["dependent_features"];
};
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.null_is_dependent
 */
export const FeatureAttributeNullIsDependentField: FC<
  FeatureAttributeNullIsDependentFieldProps
> = ({ dependentFeatures }) => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();

  if (!dependentFeatures?.length) {
    return null;
  }

  return (
    <FieldCheckbox
      label={t("FeatureAttributes.FeatureAttributeNullIsDependentField.label")}
      {...form.register("null_is_dependent")}
      helperText={
        <>
          {t(
            "FeatureAttributes.FeatureAttributeNullIsDependentField.help.dependencies",
          )}
          : {dependentFeatures.join(", ")}
          <br />
          {t(
            "FeatureAttributes.FeatureAttributeNullIsDependentField.help.description",
          )}
        </>
      }
    />
  );
};
