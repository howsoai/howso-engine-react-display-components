import { useDefaultTranslation } from "@/hooks";
import {
  FieldRadios,
  FieldRadiosProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, Fragment, useContext, useMemo } from "react";
import { RegisterOptions } from "react-hook-form";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { options, translations } from "./constants";
import { twMerge } from "tailwind-merge";

type FeatureAttributeBoundingModeFieldProps = Partial<FieldRadiosProps> & {};
export const FeatureAttributeBoundingModeField: FC<
  FeatureAttributeBoundingModeFieldProps
> = ({ required = true, ...props }) => {
  const { t } = useDefaultTranslation();
  const { fieldRadiosProps } = useContext(FeaturesAttributesContext);

  const registerOptions: RegisterOptions = useMemo(
    () => ({
      required,
    }),
    [required],
  );

  return (
    <FieldRadios
      {...fieldRadiosProps}
      label={t(translations.label)}
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
                      {t(translations.label)}
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
