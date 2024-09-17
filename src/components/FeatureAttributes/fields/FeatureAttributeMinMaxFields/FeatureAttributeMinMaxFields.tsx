import { FeatureAttributes } from "@howso/engine";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { InferFeatureAttributesBoundingMode } from "../../utils";
import { featureAttributeDateTimeFormatFieldPlaceholder } from "../FeatureAttributeDateTimeFormatField";
import { FeatureAttributeMinMaxFieldsI18nBundle as i18n } from "./FeatureAttributeMinMaxFields.i18n";

export type FeatureAttributeMinMaxFieldsProps = Partial<FieldTextProps> & {
  type: FeatureAttributes["type"] | undefined;
  dataType: FeatureAttributes["data_type"];
  boundingMode: InferFeatureAttributesBoundingMode | undefined;
  dateTimeFormat: string | undefined;
};

/**
 * Conditions:
 * Feature type: Continuous
 * And:
 *   (dataType: formatted_date_time) or (dataType: number)
 *
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureBounds.html#howso.openapi.models.FeatureBounds.min
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureBounds.html#howso.openapi.models.FeatureBounds.max
 */
export const FeatureAttributeMinMaxFields: FC<
  FeatureAttributeMinMaxFieldsProps
> = ({
  type,
  dataType,
  boundingMode,
  dateTimeFormat = featureAttributeDateTimeFormatFieldPlaceholder,
  ...props
}) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldStackProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  if (boundingMode !== "userDefined") {
    return null;
  }

  const isContinuousNumber = type === "continuous" && dataType === "number";
  const isContinuousDateTime =
    type === "continuous" && dataType === "formatted_date_time";

  if (!isContinuousNumber && !isContinuousDateTime) {
    return null;
  }

  const inputType = isContinuousDateTime ? "text" : "number";

  return (
    <div
      {...fieldStackProps?.stackProps}
      className={twMerge("flex gap-4", fieldStackProps?.stackProps?.className)}
    >
      <FieldText
        {...fieldStackProps?.fieldTextProps}
        containerProps={{ className: "basis-1/2" }}
        label={t(i18n.strings.label.min)}
        type={inputType}
        placeholder={isContinuousDateTime ? dateTimeFormat : "-100"}
        {...props}
        {...form.register("bounds.min", { valueAsNumber: isContinuousNumber })}
      />

      <FieldText
        {...fieldStackProps?.fieldTextProps}
        containerProps={{ className: "basis-1/2" }}
        label={t(i18n.strings.label.max)}
        type={inputType}
        placeholder={isContinuousDateTime ? dateTimeFormat : "100"}
        {...props}
        {...form.register("bounds.max", { valueAsNumber: isContinuousNumber })}
      />
    </div>
  );
};
