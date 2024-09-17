import { FeatureAttributes } from "@howso/engine";
import {
  FieldRadios,
  FieldRadiosProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, Fragment, useContext, useMemo } from "react";
import { RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { options } from "./constants";
import { FeatureAttributeReservedBoundingModeFieldI18nBundle as i18n } from "./FeatureAttributeReservedBoundingModeField.i18n";

type FeatureAttributeReservedBoundingModeFieldProps =
  Partial<FieldRadiosProps> & {
    featureType: FeatureAttributes["type"] | undefined;
    dataType: FeatureAttributes["data_type"];
  };
export const FeatureAttributeReservedBoundingModeField: FC<
  FeatureAttributeReservedBoundingModeFieldProps
> = ({ featureType, dataType, required = true, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldRadiosProps } = useContext(FeaturesAttributesContext);

  const registerOptions: RegisterOptions = useMemo(
    () => ({
      required,
    }),
    [required],
  );

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["continuous"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = [
    "number",
    "formatted_date_time",
  ];
  if (
    !featureType ||
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  return (
    <FieldRadios
      {...fieldRadiosProps}
      label={t(i18n.strings.label)}
      labelInline
      {...props}
      labelProps={{
        ...fieldRadiosProps?.labelProps,
        ...props.labelProps,
        tooltipProps: {
          content: (
            <dl>
              {options
                .filter(({ translations }) => !!translations.help)
                .map(({ value, translations }, index) => (
                  <Fragment key={value}>
                    <dt className={twMerge(index > 0 && "mt-2")}>
                      {t(i18n.strings.label)}
                    </dt>
                    <dd>{t(translations.help!)}</dd>
                  </Fragment>
                ))}
            </dl>
          ),
        },
      }}
      required={required}
      registerOptions={registerOptions}
      name={"reserved.boundingMode"}
      options={options.map(({ value, translations }) => ({
        value,
        text: t(translations.label),
      }))}
    />
  );
};
