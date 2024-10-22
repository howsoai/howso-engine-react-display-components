import { FeatureAttributes } from "@howso/engine";
import {
  FieldText,
  FieldTextProps,
  Link,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { featureAttributeDateTimeFormatFieldPlaceholder } from "./constants";
import { FeatureAttributeDateTimeFormatFieldI18nBundle as i18n } from "./FeatureAttributeDateTimeFormatField.i18n";

export type FeatureAttributeDateTimeFormatProps = Partial<FieldTextProps> & {
  dataType: FeatureAttributes["data_type"];
};
/**
 * If specified, feature values should match the date format specified by this string.
 *
 * Condition:
 * Data type: date_time
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.date_time_format
 */
export const FeatureAttributeDateTimeFormatField: FC<
  FeatureAttributeDateTimeFormatProps
> = ({ dataType, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextProps, purposes } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  const allowedDataTypes: FeatureAttributes["data_type"][] = [
    "formatted_date_time",
    "formatted_time",
  ];
  if (!allowedDataTypes.includes(dataType) || !purposes.includes("core")) {
    return null;
  }

  const required = true;

  return (
    <FieldText
      label={t(i18n.strings.label)}
      placeholder={featureAttributeDateTimeFormatFieldPlaceholder}
      required={required}
      {...fieldTextProps}
      {...props}
      {...form.register("date_time_format", { required })}
      helperText={
        <Trans t={t} i18nKey={i18n.strings.help}>
          Any valid
          <Link
            href="https://en.cppreference.com/w/cpp/chrono/system_clock/formatter"
            target="_blank"
            external
          >
            standard format specification
          </Link>
          format.
        </Trans>
      }
    />
  );
};
