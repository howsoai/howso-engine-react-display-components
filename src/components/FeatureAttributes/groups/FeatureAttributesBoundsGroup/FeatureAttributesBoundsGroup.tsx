import { FeatureAttributes } from "@howso/engine";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import {
  FeatureAttributeAllowNullsField,
  FeatureAttributeAllowedValuesField,
  FeatureAttributeMinMaxFields,
  FeatureAttributeReservedBoundingModeField,
} from "../../fields";
import { InferFeatureAttributesBoundingMode } from "../../utils";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import { FeatureAttributesBoundsGroupI18nBundle as i18n } from "./FeatureAttributesBoundsGroup.i18n";

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
  const { t } = useTranslation(i18n.namespace);
  const { purposes } = useContext(FeaturesAttributesContext);

  if (!purposes.includes("core")) {
    return null;
  }

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t(i18n.strings.title)}
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
