import { FeatureAttributes, FeatureDataType } from "@howso/engine";
import {
  FieldText,
  FieldTextProps,
  Link,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { featureAttributeLocaleFieldLabel } from "./constants";
import { FeatureAttributeLocaleFieldI18nBundle as i18n } from "./FeatureAttributeLocaleField.i18n";

export type FeatureAttributeLocaleFieldProps = Partial<FieldTextProps> & {
  dataType: FeatureAttributes["data_type"];
};
/**
 * If specified, feature values should match the date format specified by this string.
 *
 * Conditions:
 * (Feature type: Continuous AND Data type: formatted_date_time)
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.locale
 * @see https://faker.readthedocs.io/en/master/locales.html
 */
export const FeatureAttributeLocaleField: FC<
  FeatureAttributeLocaleFieldProps
> = ({ dataType, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextProps, purposes } = useContext(FeaturesAttributesContext);
  const form = useFormContext();
  const allowedTypes: FeatureDataType[] = [
    "formatted_date_time",
    "formatted_time",
  ];

  if (
    !dataType ||
    allowedTypes.includes(dataType) ||
    !purposes.includes("core")
  ) {
    return null;
  }

  const required = false;

  return (
    <FieldText
      {...fieldTextProps}
      type="text"
      label={t(featureAttributeLocaleFieldLabel)}
      placeholder="en; en_US; zh_CN"
      required={required}
      {...props}
      {...form.register("locale", { required })}
      helperText={
        <Trans t={t} i18nKey={i18n.strings.help}>
          The
          <Link
            href="https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes"
            target="_blank"
            external
          >
            ISO-639 Language Code
          </Link>
          with optional
          <Link
            href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"
            target="_blank"
            external
          >
            ISO-3166 Country Code
          </Link>
          ...
        </Trans>
      }
    />
  );
};
