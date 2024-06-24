import { FC, ReactNode, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeObservationalErrorFieldProps =
  Partial<FieldTextProps> & {
    featureType: FeatureAttributes["type"];
    dataType: FeatureAttributes["data_type"];
  };
/**
 * Specify the observed error value for this feature. Use when the error value is already known. Defaults to 0.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.observational_error
 */
export const FeatureAttributeObservationalErrorField: FC<
  FeatureAttributeObservationalErrorFieldProps
> = ({ featureType, dataType, ...props }) => {
  const { t } = useDefaultTranslation();
  const { fieldTextProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  const max = featureType === "nominal" ? 1 : undefined;

  return (
    <FieldText
      {...fieldTextProps}
      label={t(
        "FeatureAttributes.FeatureAttributeObservationalErrorField.label",
      )}
      inputMode="numeric"
      placeholder="0.0"
      {...props}
      {...form.register("observational_error", {
        min: 0,
        max,
        valueAsNumber: true,
      })}
      helperText={<HelperText featureType={featureType} dataType={dataType} />}
    />
  );
};

const HelperText: FC<FeatureAttributeObservationalErrorFieldProps> = ({
  featureType,
  dataType,
}): ReactNode => {
  const { t } = useDefaultTranslation();

  switch (true) {
    case featureType === "ordinal":
      return t(
        "FeatureAttributes.FeatureAttributeObservationalErrorField.help.ordinal",
      );
    case featureType === "nominal":
      return t(
        "FeatureAttributes.FeatureAttributeObservationalErrorField.help.nominal",
      );
    case [
      "string",
      "string_mixable",
      "json",
      "yaml",
      "formatted_date_time",
    ].includes(dataType || ""):
      return t(
        "FeatureAttributes.FeatureAttributeObservationalErrorField.help.string",
      );
    default:
      return t(
        "FeatureAttributes.FeatureAttributeObservationalErrorField.help.default",
      );
  }
};
