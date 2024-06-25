import { FC, Fragment, useContext, useMemo } from "react";
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
import { twMerge } from "tailwind-merge";

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

  switch (fieldType) {
    case "radios":
      return (
        // @ts-expect-error WTB proper infer in 5.5 please.
        <FieldTypeRadios
          required={required}
          {...props}
          registerOptions={registerOptions}
        />
      );
    case "select":
      return (
        // @ts-expect-error WTB proper infer in 5.5 please.
        <FieldTypeSelect
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
      labelProps={{
        ...fieldRadiosProps?.labelProps,
        ...props.labelProps,
        tooltipProps: { content: <TooltipContents /> },
      }}
      required={required}
      name={featureAttributeTypeName}
      options={Object.values(featureAttributeTypeOptions).map(
        ({ value, translations }) => ({
          value,
          text: t(translations.label),
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
      labelProps={{
        ...fieldSelectProps?.labelProps,
        ...props.labelProps,
        tooltipProps: { content: <TooltipContents /> },
      }}
      required={required}
      {...form.register(featureAttributeTypeName, registerOptions)}
    >
      <option value="" />
      {Object.values(featureAttributeTypeOptions).map(
        ({ value, translations }) => (
          <option key={value} value={value}>
            {t(translations.label)}
          </option>
        ),
      )}
    </FieldSelect>
  );
};

const TooltipContents: FC = () => {
  const { t } = useDefaultTranslation();

  return (
    <dl>
      {Object.entries(featureAttributeTypeOptions)
        .filter(([, { translations }]) => !!translations.help)
        .map(([type, { translations }], index) => (
          <Fragment key={type}>
            <dt className={twMerge(index > 0 && "mt-2")}>
              {t(translations.label)}
            </dt>
            <dd>
              {t(translations.help.description)} ({t(translations.help.example)}
              )
            </dd>
          </Fragment>
        ))}
    </dl>
  );
};
