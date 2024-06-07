import { ChangeEventHandler, FC, forwardRef, useCallback } from "react";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  featureAttributeAllowedValuesFieldName,
  featureAttributeAllowedValuesFieldNominalLabel,
  featureAttributeAllowedValuesFieldOrdinalLabel,
} from "./constants";
import { featureAttributeDateTimeFormatFieldPlaceholder } from "../FeatureAttributeDateTimeFormatField";
import { FieldTextAreaList } from "@howso/react-tailwind-flowbite-components";
import { Textarea, TextareaProps } from "flowbite-react";
import { useFormContext } from "react-hook-form";

export type FeatureAttributeAllowedValuesFieldProps = {
  featureType: FeatureAttributes["type"];
  dataType: FeatureAttributes["data_type"];
  dateTimeFormat: string | undefined;
};
/**
 * Explicitly allowed values to be output.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureBounds.html#howso.openapi.models.FeatureBounds.allowed
 */
export const FeatureAttributeAllowedValuesField: FC<
  FeatureAttributeAllowedValuesFieldProps
> = ({
  featureType,
  dataType,
  dateTimeFormat = featureAttributeDateTimeFormatFieldPlaceholder,
}) => {
  const { t } = useDefaultTranslation();
  const { control } = useFormContext();
  const allowedFeatureTypes: FeatureAttributes["type"][] = [
    "nominal",
    "ordinal",
  ];
  const allowedDataTypes: FeatureAttributes["data_type"][] = [
    "string",
    "number",
    "formatted_date_time",
  ];
  if (
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  const required = false;
  const label =
    featureType === "ordinal"
      ? t(featureAttributeAllowedValuesFieldOrdinalLabel)
      : t(featureAttributeAllowedValuesFieldNominalLabel);
  const helperText =
    featureType === "ordinal"
      ? t("FeatureAttributes.FeatureAttributeAllowedValuesField.help.ordinal")
      : t("FeatureAttributes.FeatureAttributeAllowedValuesField.help.nominal");
  const placeholder = getPlaceholder({ featureType, dataType, dateTimeFormat });

  return (
    <>
      <FieldTextAreaList
        name={featureAttributeAllowedValuesFieldName}
        label={label}
        labelProps={{
          required,
        }}
        placeholder={placeholder}
        helperText={helperText}
        rows={4}
      />
      {/* <FieldContainer>
        <FieldLabel
          htmlFor={featureAttributeAllowedValuesFieldName}
          required={required}
        >
          {label}
        </FieldLabel>
        <Controller
          name={featureAttributeAllowedValuesFieldName}
          rules={{ required }}
          control={control}
          render={({ field }) => (
            <TextareaList
              id={featureAttributeAllowedValuesFieldName}
              {...field}
              placeholder={placeholder}
              rows={4}
              className="min-h-16"
            />
          )}
        />
        <HelperText color={color}>
        {hasError ? translatedErrorMessage || <ErrorMessage name={featureAttributeAllowedValuesFieldName} /> : helperText}
      </HelperText>
      </FieldContainer> */}
    </>
  );
};

const getPlaceholder = ({
  featureType,
  dataType,
  dateTimeFormat,
}: Pick<
  FeatureAttributeAllowedValuesFieldProps,
  "featureType" | "dataType" | "dateTimeFormat"
>): string => {
  switch (true) {
    case dataType === "formatted_date_time":
      return `${dateTimeFormat}
${dateTimeFormat}
${dateTimeFormat}
${dateTimeFormat}`;
    case featureType === "nominal" && dataType === "string":
      return `Fibonacci
Pythagoras
Euclid
Albert Einstein
`;
    case featureType === "nominal" && dataType === "number":
      return `400
200
350
100
`;
    case featureType === "ordinal" && dataType === "string":
      return `xs
sm
md
lg
xl
`;
    case featureType === "ordinal" && dataType === "number":
      return `2
3
5
7
11
13
`;
    default:
      return "";
  }
};

export interface TextareaListProps
  extends Omit<TextareaProps, "onChange" | "value" | "defaultValue"> {
  value?: string[];
  defaultValue?: string[];
  onChange?: (newValue: string[]) => void;
}

export const TextareaList = forwardRef<HTMLTextAreaElement, TextareaListProps>(
  ({ onChange, value, defaultValue, ...props }, ref) => {
    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      (event) => {
        if (onChange) {
          const newValue = event.currentTarget.value;
          const values = newValue ? newValue.split("\n") : [];
          onChange(values);
        }
      },
      [onChange],
    );
    return (
      <Textarea
        ref={ref}
        {...props}
        value={value ? value.join("\n") : undefined}
        defaultValue={defaultValue ? defaultValue.join("\n") : undefined}
        onChange={handleChange}
      />
    );
  },
);
