import { FC, useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import { isFeatureAttributeSensitiveAttributeAvailable } from "./FeatureAttributeIsSensitiveField.utils";
import { FieldCheckbox } from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeIsSensitiveFieldProps = {
  featureType: FeatureAttributes["type"] | undefined;
  dataType: FeatureAttributes["data_type"];
};
/**
 * Flag a categorical nominal feature as non-sensitive.
 * It is recommended that all nominal features be represented with either an int-id subtype or another available
 * nominal subtype using the subtype attribute. However, if the nominal feature is non-sensitive, setting this
 * parameter to true will bypass the subtype requirement. Only applicable to nominal features.
 *
 * The shown input represents "sensitive" but the value represents "non_sensitive", invert the value
 *
 * Conditions:
 * Feature type: Nominal, Ordinal
 * Data type: Not amalgam or boolean
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.non_sensitive
 */
export const FeatureAttributeIsSensitiveField: FC<
  FeatureAttributeIsSensitiveFieldProps
> = ({ featureType, dataType }) => {
  const { t } = useDefaultTranslation();
  const { fieldCheckboxProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  if (
    !isFeatureAttributeSensitiveAttributeAvailable({
      type: featureType,
      data_type: dataType,
    })
  ) {
    return null;
  }

  return (
    <Controller
      name="non_sensitive"
      control={form.control}
      defaultValue={false}
      render={({ field: { onChange, value, ...field } }) => (
        // @ts-expect-error Minimal typing differences
        <FieldCheckbox
          {...fieldCheckboxProps}
          label={t("FeatureAttributes.FeatureAttributeIsSensitiveField.label")}
          {...field}
          checked={!value}
          onChange={async (evt) => onChange(!evt.target.checked)}
          helperText={t(
            "FeatureAttributes.FeatureAttributeIsSensitiveField.help",
          )}
        />
      )}
    />
  );
};
