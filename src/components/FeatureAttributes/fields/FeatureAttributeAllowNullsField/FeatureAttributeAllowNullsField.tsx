import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import {
  featureAttributeAllowNullsFieldLabel,
  featureAttributeAllowNullsFieldName,
} from "./constants";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributeAllowNullsFieldProps = Record<string, unknown>;
/**
 * Allow nulls to be output, per their distribution in the data. Defaults to true.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureBounds.html#howso.openapi.models.FeatureBounds.allow_null
 */
export const FeatureAttributeAllowNullsField: FC<
  FeatureAttributeAllowNullsFieldProps
> = () => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();

  return (
    <Controller
      name={featureAttributeAllowNullsFieldName}
      defaultValue={true}
      control={form.control}
      render={({ field }) => (
        // @ts-expect-error There's a mismatch here I can't solve for
        <FieldCheckbox
          {...field}
          label={t(featureAttributeAllowNullsFieldLabel)}
          checked={field.value ?? true}
        />
      )}
    />
  );
};
