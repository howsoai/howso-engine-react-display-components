import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  featureAttributeTypeDefaultValue,
  featureAttributeTypeLabel,
} from "./constants";
import {
  FieldSelect,
  type FieldSelectProps,
} from "@howso/react-tailwind-flowbite-components";
import { getFeatureAttributesForType } from "../../utils";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeTypeFieldProps = Partial<FieldSelectProps>;
/**
 * The type of the feature.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.type
 */
export const FeatureAttributeTypeField: FC<FeatureAttributeTypeFieldProps> = ({
  required = true,
  ...props
}) => {
  const { t } = useDefaultTranslation();
  const { fieldSelectProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();
  const featureType =
    form.getValues("type") || featureAttributeTypeDefaultValue;

  return (
    <FieldSelect
      {...fieldSelectProps}
      label={t(featureAttributeTypeLabel)}
      helperText={<FeatureTypeHelperText featureType={featureType} />}
      {...props}
      required={required}
      defaultValue={featureAttributeTypeDefaultValue}
      {...form.register("type", {
        required,
        onChange: async (event) => {
          const currentValues = form.getValues() as FeatureAttributes;
          const newValues = getFeatureAttributesForType({
            ...currentValues,
            type: event.target.value,
          });
          form.setValue("id_feature", newValues.id_feature);
          form.setValue("data_type", newValues.data_type);
          form.setValue("date_time_format", newValues.date_time_format);
          form.setValue("decimal_places", newValues.decimal_places);
          if (props.onChange) {
            await props.onChange(event);
          }
        },
      })}
    >
      <option value="continuous">
        {t("FeatureAttributes.FeatureAttributeTypeField.options.continuous")}
      </option>
      <option value="nominal">
        {t("FeatureAttributes.FeatureAttributeTypeField.options.nominal")}
      </option>
      <option value="ordinal">
        {t("FeatureAttributes.FeatureAttributeTypeField.options.ordinal")}
      </option>
    </FieldSelect>
  );
};

const FeatureTypeHelperText: FC<{
  featureType: FeatureAttributes["type"] | undefined;
}> = ({ featureType }) => {
  const { t } = useDefaultTranslation();

  switch (featureType) {
    case "continuous":
      return (
        <>
          {t(
            "FeatureAttributes.FeatureAttributeTypeField.help.continuous.description",
          )}{" "}
          (
          {t(
            "FeatureAttributes.FeatureAttributeTypeField.help.continuous.example",
          )}
          )
        </>
      );
    case "nominal":
      return (
        <>
          {t(
            "FeatureAttributes.FeatureAttributeTypeField.help.nominal.description",
          )}{" "}
          (
          {t(
            "FeatureAttributes.FeatureAttributeTypeField.help.nominal.example",
          )}
          )
        </>
      );
    case "ordinal":
      return (
        <>
          {t(
            "FeatureAttributes.FeatureAttributeTypeField.help.ordinal.description",
          )}{" "}
          (
          {t(
            "FeatureAttributes.FeatureAttributeTypeField.help.ordinal.example",
          )}
          )
        </>
      );
    default:
      return null;
  }
};
