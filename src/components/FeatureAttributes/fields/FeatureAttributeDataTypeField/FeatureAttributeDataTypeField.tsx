import { FC, ReactNode } from "react";
import { useDefaultTranslation } from "@/hooks";
import {
  FeatureAttributesDataTypeEnum,
  FeatureAttributesTypeEnum,
} from "@howso/openapi-client";
import { useFormContext } from "react-hook-form";
import { featureAttributeDataTypeFieldLabel } from "./constants";
import { FieldSelect } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributeDataTypeFieldProps = {
  featureType: FeatureAttributesTypeEnum;
};
/**
 * Specify the data type for features with a type of nominal or continuous.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.data_type
 */
export const FeatureAttributeDataTypeField: FC<
  FeatureAttributeDataTypeFieldProps
> = ({ featureType }) => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();
  const dataType = form.getValues("data_type");
  const required = true;

  return (
    <FieldSelect
      label={t(featureAttributeDataTypeFieldLabel)}
      required={required}
      helperText={<HelperText dataType={dataType} />}
      {...form.register("data_type", { required })}
    >
      <option value="string">
        {t("FeatureAttributes.FeatureAttributeDataTypeField.options.string")}
      </option>
      <option value="number">
        {t("FeatureAttributes.FeatureAttributeDataTypeField.options.number")}
      </option>
      <option value="formatted_date_time">
        {t(
          "FeatureAttributes.FeatureAttributeDataTypeField.options.formatted_date_time",
        )}
      </option>
      <option value="json" disabled={featureType === "ordinal"}>
        {t("FeatureAttributes.FeatureAttributeDataTypeField.options.json")}
      </option>
      <option value="yaml" disabled={featureType === "ordinal"}>
        {t("FeatureAttributes.FeatureAttributeDataTypeField.options.yaml")}
      </option>
      <option value="amalgam" disabled={featureType === "ordinal"}>
        {t("FeatureAttributes.FeatureAttributeDataTypeField.options.amalgam")}
      </option>

      <optgroup
        label={t(
          "FeatureAttributes.FeatureAttributeDataTypeField.options.groups.continuous",
        )}
      >
        <option value="string_mixable" disabled={featureType !== "continuous"}>
          {t(
            "FeatureAttributes.FeatureAttributeDataTypeField.options.string_mixable",
          )}
        </option>
      </optgroup>

      <optgroup
        label={t(
          "FeatureAttributes.FeatureAttributeDataTypeField.options.groups.nominal",
        )}
      >
        <option value="boolean" disabled={featureType !== "nominal"}>
          {t("FeatureAttributes.FeatureAttributeDataTypeField.options.boolean")}
        </option>
      </optgroup>
    </FieldSelect>
  );
};

const HelperText: FC<{
  dataType: FeatureAttributesDataTypeEnum | undefined;
}> = ({ dataType }): ReactNode => {
  const { t } = useDefaultTranslation();

  switch (dataType) {
    case "formatted_date_time":
      return t(
        "FeatureAttributes.FeatureAttributeDataTypeField.help.formattedDateTime",
      );
    default:
      return null;
  }
};
