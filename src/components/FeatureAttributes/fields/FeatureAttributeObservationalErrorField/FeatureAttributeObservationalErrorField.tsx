import { FC, ReactNode, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeObservationalErrorFieldIl8nBundle as il8n } from "./FeatureAttributeObservationalErrorField.il8n";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(il8n.namespace);
  const { fieldTextProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  const max = featureType === "nominal" ? 1 : undefined;

  return (
    <FieldText
      {...fieldTextProps}
      label={t(il8n.strings.label)}
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
  const { t } = useTranslation(il8n.namespace);

  switch (true) {
    case featureType === "ordinal":
      return t(il8n.strings.help.ordinal);
    case featureType === "nominal":
      return t(il8n.strings.help.nominal);
    case [
      "string",
      "string_mixable",
      "json",
      "yaml",
      "formatted_date_time",
    ].includes(dataType || ""):
      return t(il8n.strings.help.string);
    default:
      return t(il8n.strings.help.default);
  }
};
