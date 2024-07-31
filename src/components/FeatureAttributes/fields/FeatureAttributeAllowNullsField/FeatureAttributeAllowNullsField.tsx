import { FC, useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  featureAttributeAllowNullsFieldLabel,
  featureAttributeAllowNullsFieldName,
} from "./constants";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { useTranslation } from "react-i18next";
import { FeatureAttributeAllowNullsFieldI18nBundle as i18n } from "./FeatureAttributeAllowNullsField.i18n";

export type FeatureAttributeAllowNullsFieldProps = Record<string, unknown>;
/**
 * Allow nulls to be output, per their distribution in the data. Defaults to true.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureBounds.html#howso.openapi.models.FeatureBounds.allow_null
 */
export const FeatureAttributeAllowNullsField: FC<
  FeatureAttributeAllowNullsFieldProps
> = () => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  return (
    <Controller
      name={featureAttributeAllowNullsFieldName}
      defaultValue={true}
      control={form.control}
      render={({ field }) => (
        // @ts-expect-error There's a mismatch here I can't solve for
        <FieldCheckbox
          {...fieldCheckboxProps}
          {...field}
          label={t(featureAttributeAllowNullsFieldLabel)}
          data-testid="FeatureAttributeAllowNullsField"
          checked={field.value ?? true}
        />
      )}
    />
  );
};
