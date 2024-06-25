import { FC } from "react";
import { useDefaultTranslation } from "@/hooks";
import {
  FeatureAttributeAllowNullsField,
  FeatureAttributeAllowedValuesField,
  FeatureAttributeBoundingModeField,
  FeatureAttributeMinMaxFields,
} from "../../fields";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import { FeatureAttributes } from "@howso/openapi-client";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { FeatureAttributesBoundingMode } from "../../utils";

export type FeatureAttributesBoundsGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
> & {
  featureType: FeatureAttributes["type"];
  dataType: FeatureAttributes["data_type"];
  boundingMode: FeatureAttributesBoundingMode | undefined;
  dateTimeFormat: string | undefined;
};

/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureBounds.html#howso.openapi.models.FeatureBounds
 */
export const FeatureAttributesBoundsGroup: FC<
  FeatureAttributesBoundsGroupProps
> = ({ featureType, dataType, boundingMode, dateTimeFormat, ...props }) => {
  const { t } = useDefaultTranslation();

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t("FeatureAttributes.FeatureAttributesBoundsGroup.title")}
      basic={
        <div className={formSpacingYDefault}>
          <FeatureAttributeAllowNullsField />
          <FeatureAttributeBoundingModeField />
          <FeatureAttributeAllowedValuesField
            featureType={featureType}
            dataType={dataType}
            dateTimeFormat={dateTimeFormat}
          />
          <FeatureAttributeMinMaxFields
            type={featureType}
            dataType={dataType}
            boundingMode={boundingMode}
            dateTimeFormat={dateTimeFormat}
          />
        </div>
      }
    />
  );
};
