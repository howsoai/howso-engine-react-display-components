import { FC, useContext, useMemo } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  featureAttributeTypeLabel,
  featureAttributeTypeName,
  featureAttributeTypeOptions,
} from "./constants";
import {
  FieldRadios,
  FieldSelect,
  FieldSelectProps,
  type FieldRadiosProps,
} from "@howso/react-tailwind-flowbite-components";
import {
  FeatureAttributeFormValues,
  getFeatureAttributesForType,
} from "../../utils";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeTypeFieldProps =
  | ({ fieldType: "radios" } & Partial<FieldRadiosProps>)
  | ({ fieldType: "select" } & Partial<FieldSelectProps>);
/**
 * The type of the feature.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.type
 */
export const FeatureAttributeTypeField: FC<FeatureAttributeTypeFieldProps> = ({
  fieldType,
  onChange,
  required,
  ...props
}) => {
  const form = useFormContext<FeatureAttributeFormValues>();
  const registerOptions: RegisterOptions = useMemo(
    () => ({
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
        if (onChange) {
          await onChange(event);
        }
      },
    }),
    [form, required, onChange],
  );

  const featureType = form.getValues(featureAttributeTypeName);

  switch (fieldType) {
    case "radios":
      return (
        // @ts-expect-error WTB proper infer in 5.5 please.
        <FieldTypeRadios
          helperText={<FeatureTypeHelperText featureType={featureType} />}
          required={required}
          {...props}
          registerOptions={registerOptions}
        />
      );
    case "select":
      return (
        // @ts-expect-error WTB proper infer in 5.5 please.
        <FieldTypeSelect
          helperText={<FeatureTypeHelperText featureType={featureType} />}
          required={required}
          {...props}
          registerOptions={registerOptions}
        />
      );
  }
};

type FieldTypeRadiosProps = Partial<FieldRadiosProps> & {
  registerOptions: RegisterOptions;
};
const FieldTypeRadios: FC<FieldTypeRadiosProps> = ({
  required = true,
  ...props
}) => {
  const { t } = useDefaultTranslation();
  const { fieldRadiosProps } = useContext(FeaturesAttributesContext);

  return (
    <FieldRadios
      {...fieldRadiosProps}
      label={t(featureAttributeTypeLabel)}
      labelInline
      {...props}
      required={required}
      name={featureAttributeTypeName}
      options={Object.values(featureAttributeTypeOptions).map(
        ({ value, translationKey }) => ({
          value,
          text: t(translationKey),
        }),
      )}
    />
  );
};

type FieldTypeSelectProps = Partial<FieldSelectProps> & {
  registerOptions: RegisterOptions;
};
const FieldTypeSelect: FC<FieldTypeSelectProps> = ({
  required = true,
  registerOptions,
  ...props
}) => {
  const { t } = useDefaultTranslation();
  const { fieldSelectProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext<FeatureAttributeFormValues>();

  return (
    <FieldSelect
      {...fieldSelectProps}
      label={t(featureAttributeTypeLabel)}
      {...props}
      required={required}
      {...form.register(featureAttributeTypeName, registerOptions)}
    >
      <option value="" />
      {Object.values(featureAttributeTypeOptions).map(
        ({ value, translationKey }) => (
          <option key={value} value={value}>
            {t(translationKey)}
          </option>
        ),
      )}
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
      return t(
        "FeatureAttributes.FeatureAttributeTypeField.help.empty.description",
      );
  }
};
