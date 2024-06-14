import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { FeatureAttributes } from "@howso/openapi-client";
import { featureAttributeDateTimeFormatFieldPlaceholder } from "../FeatureAttributeDateTimeFormatField";
import {
  FieldText,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributeMinMaxFieldsProps = Partial<FieldTextProps> & {
  type: FeatureAttributes["type"];
  dataType: FeatureAttributes["data_type"];
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
  dateTimeFormat = featureAttributeDateTimeFormatFieldPlaceholder,
  ...props
}) => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();
  const isContinuousNumber = type === "continuous" && dataType === "number";
  const isContinuousDateTime =
    type === "continuous" && dataType === "formatted_date_time";

  if (!isContinuousNumber && !isContinuousDateTime) {
    return null;
  }

  const inputType = isContinuousDateTime ? "text" : "number";

  return (
    <div className="flex gap-4">
      <FieldText
        containerProps={{ className: "basis-1/2" }}
        label={t("FeatureAttributes.FeatureAttributeMinMaxFields.label.min")}
        type={inputType}
        placeholder={isContinuousDateTime ? dateTimeFormat : "-100"}
        {...props}
        {...form.register("bounds.min", { valueAsNumber: isContinuousNumber })}
      />

      <FieldText
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
