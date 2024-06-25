import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import { featureAttributeDateTimeFormatFieldPlaceholder } from "../FeatureAttributeDateTimeFormatField";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { twMerge } from "tailwind-merge";
import { InferFeatureAttributesBoundingMode } from "../../utils";

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
  const { t } = useDefaultTranslation();
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
        label={t("FeatureAttributes.FeatureAttributeMinMaxFields.label.min")}
        type={inputType}
        placeholder={isContinuousDateTime ? dateTimeFormat : "-100"}
        {...props}
        {...form.register("bounds.min", { valueAsNumber: isContinuousNumber })}
      />

      <FieldText
        {...fieldStackProps?.fieldTextProps}
        containerProps={{ className: "basis-1/2" }}
        label={t("FeatureAttributes.FeatureAttributeMinMaxFields.label.max")}
        type={inputType}
        placeholder={isContinuousDateTime ? dateTimeFormat : "100"}
        {...props}
        {...form.register("bounds.max", { valueAsNumber: isContinuousNumber })}
      />
    </div>
  );
};
