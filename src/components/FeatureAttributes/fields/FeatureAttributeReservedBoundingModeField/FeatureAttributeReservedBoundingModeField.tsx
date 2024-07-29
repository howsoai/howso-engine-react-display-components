import {
  FieldRadios,
  FieldRadiosProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, Fragment, useContext, useMemo } from "react";
import { RegisterOptions } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { options } from "./constants";
import { twMerge } from "tailwind-merge";
import { FeatureAttributes } from "@howso/openapi-client";
import { FeatureAttributeReservedBoundingModeFieldIl8nBundle as il8n } from "./FeatureAttributeReservedBoundingModeField.il8n";
import { useTranslation } from "react-i18next";

type FeatureAttributeReservedBoundingModeFieldProps =
  Partial<FieldRadiosProps> & {
    featureType: FeatureAttributes["type"] | undefined;
    dataType: FeatureAttributes["data_type"];
  };
export const FeatureAttributeReservedBoundingModeField: FC<
  FeatureAttributeReservedBoundingModeFieldProps
> = ({ featureType, dataType, required = true, ...props }) => {
  const { t } = useTranslation(il8n.namespace);
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
      label={t(il8n.strings.label)}
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
                      {t(il8n.strings.label)}
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
