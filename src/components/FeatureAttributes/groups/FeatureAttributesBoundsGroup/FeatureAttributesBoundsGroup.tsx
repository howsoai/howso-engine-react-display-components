import { useDefaultTranslation } from "@/hooks";
import {
  FeatureAttributeAllowNullsField,
  FeatureAttributeAllowedValuesField,
  FeatureAttributeMinMaxFields,
} from "../../fields";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import { FeatureAttributes } from "@howso/openapi-client";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributesBoundsGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
> & {
  featureType: FeatureAttributes["type"];
  dataType: FeatureAttributes["data_type"];
  dateTimeFormat: string | undefined;
};

/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureBounds.html#howso.openapi.models.FeatureBounds
 */
export function FeatureAttributesBoundsGroup({
  featureType,
  dataType,
  dateTimeFormat,
  ...props
}: FeatureAttributesBoundsGroupProps) {
  const { t } = useDefaultTranslation();

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t("FeatureAttributes.FeatureAttributesBoundsGroup.title")}
      basic={
        <div className={formSpacingYDefault}>
          <FeatureAttributeAllowNullsField />
          <FeatureAttributeAllowedValuesField
            featureType={featureType}
            dataType={dataType}
            dateTimeFormat={dateTimeFormat}
          />
          <FeatureAttributeMinMaxFields
            type={featureType}
            dataType={dataType}
            dateTimeFormat={dateTimeFormat}
          />
        </div>
      }
    />
  );
}
