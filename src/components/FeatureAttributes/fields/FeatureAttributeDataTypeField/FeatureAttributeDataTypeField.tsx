import {
  FeatureAttributesDataTypeEnum,
  FeatureAttributesTypeEnum,
} from "@howso/engine";
import {
  FieldSelect,
  FieldSelectProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, ReactNode, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeDataTypeFieldI18nBundle as i18n } from "./FeatureAttributeDataTypeField.i18n";

export type FeatureAttributeDataTypeFieldProps = Partial<FieldSelectProps> & {
  featureType: FeatureAttributesTypeEnum | undefined;
};
/**
 * Specify the data type for features with a type of nominal or continuous.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.data_type
 */
export const FeatureAttributeDataTypeField: FC<
  FeatureAttributeDataTypeFieldProps
> = ({ featureType, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldSelectProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();
  const dataType = form.getValues("data_type");
  const required = true;

  return (
    <FieldSelect
      label={t(i18n.strings.label)}
      required={required}
      helperText={<HelperText dataType={dataType} />}
      data-testid={"FeatureAttributeDataTypeField"}
      {...fieldSelectProps}
      {...props}
      {...form.register("data_type", { required })}
    >
      <option value="string">{t(i18n.strings.options.string)}</option>
      <option value="number">{t(i18n.strings.options.number)}</option>
      <option value="formatted_date_time">
        {t(i18n.strings.options.formattedDateTime)}
      </option>
      <option value="json" disabled={featureType === "ordinal"}>
        {t(i18n.strings.options.json)}
      </option>
      <option value="yaml" disabled={featureType === "ordinal"}>
        {t(i18n.strings.options.yaml)}
      </option>
      <option value="amalgam" disabled={featureType === "ordinal"}>
        {t(i18n.strings.options.amalgam)}
      </option>

      <optgroup label={t(i18n.strings.options.groups.continuous)}>
        <option value="string_mixable" disabled={featureType !== "continuous"}>
          {t(i18n.strings.options.stringMixable)}
        </option>
      </optgroup>

      <optgroup label={t(i18n.strings.options.groups.nominal)}>
        <option value="boolean" disabled={featureType !== "nominal"}>
          {t(i18n.strings.options.boolean)}
        </option>
      </optgroup>
    </FieldSelect>
  );
};

const HelperText: FC<{
  dataType: FeatureAttributesDataTypeEnum | undefined;
}> = ({ dataType }): ReactNode => {
  const { t } = useTranslation(i18n.namespace);

  switch (dataType) {
    case "formatted_date_time":
      return t(i18n.strings.help.formattedDateTime);
    default:
      return null;
  }
};
