import { FeatureAttributes } from "@howso/engine";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, ReactNode, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeObservationalErrorFieldI18nBundle as i18n } from "./FeatureAttributeObservationalErrorField.i18n";

export type FeatureAttributeObservationalErrorFieldProps =
  Partial<FieldTextProps> & {
    featureType: FeatureAttributes["type"] | undefined;
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
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextProps, purposes } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  if (!purposes.includes("core")) {
    return null;
  }

  const max = featureType === "nominal" ? 1 : undefined;

  return (
    <FieldText
      {...fieldTextProps}
      label={t(i18n.strings.label)}
      inputMode="numeric"
      placeholder="0.0"
      data-testid="FeatureAttributeObservationalErrorField"
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
  const { t } = useTranslation(i18n.namespace);

  switch (true) {
    case featureType === "ordinal":
      return t(i18n.strings.help.ordinal);
    case featureType === "nominal":
      return t(i18n.strings.help.nominal);
    case [
      "string",
      "string_mixable",
      "json",
      "yaml",
      "formatted_date_time",
      "formatted_time",
    ].includes(dataType || ""):
      return t(i18n.strings.help.string);
    default:
      return t(i18n.strings.help.default);
  }
};
