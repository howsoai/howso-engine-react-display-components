import { FC } from "react";
import { useDefaultTranslation } from "@/hooks";
import {
  FeatureAttributeAllowNullsField,
  FeatureAttributeAllowedValuesField,
  FeatureAttributeReservedBoundingModeField,
  FeatureAttributeMinMaxFields,
} from "../../fields";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import { FeatureAttributes } from "@howso/openapi-client";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { InferFeatureAttributesBoundingMode } from "../../utils";

export type FeatureAttributesBoundsGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
> & {
  featureType: FeatureAttributes["type"] | undefined;
  dataType: FeatureAttributes["data_type"];
  boundingMode: InferFeatureAttributesBoundingMode | undefined;
  dateTimeFormat: string | undefined;
  isTimeFeature: boolean | undefined;
};

/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureBounds.html#howso.openapi.models.FeatureBounds
 */
export const FeatureAttributesBoundsGroup: FC<
  FeatureAttributesBoundsGroupProps
> = ({
  featureType,
  dataType,
  boundingMode,
  dateTimeFormat,
  isTimeFeature,
  ...props
}) => {
  const { t } = useDefaultTranslation();

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t("FeatureAttributes.FeatureAttributesBoundsGroup.title")}
      basic={
        <div className={formSpacingYDefault}>
          <FeatureAttributeAllowNullsField />
          <FeatureAttributeReservedBoundingModeField
            featureType={featureType}
            dataType={dataType}
          />
          <FeatureAttributeMinMaxFields
            type={featureType}
            dataType={dataType}
            boundingMode={boundingMode}
            dateTimeFormat={dateTimeFormat}
          />
          <FeatureAttributeAllowedValuesField
            featureType={featureType}
            dataType={dataType}
            dateTimeFormat={dateTimeFormat}
          />
        </div>
      }
    />
  );
};
