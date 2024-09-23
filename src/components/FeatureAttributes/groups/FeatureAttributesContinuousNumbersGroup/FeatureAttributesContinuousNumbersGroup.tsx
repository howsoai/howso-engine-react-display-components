import { FeatureAttributes } from "@howso/engine";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import {
  FeatureAttributeCycleLengthField,
  FeatureAttributeDecimalPlacesField,
  FeatureAttributeSignificantDigitsField,
} from "../../fields";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import { FeatureAttributesContinuousNumbersGroupI18nBundle as i18n } from "./FeatureAttributesContinuousNumbersGroup.i18n";

export type FeatureAttributesContinuousNumbersGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
> & {
  featureType: FeatureAttributes["type"] | undefined;
  dataType: FeatureAttributes["data_type"];
};
export const FeatureAttributesContinuousNumbersGroup: FC<
  FeatureAttributesContinuousNumbersGroupProps
> = ({ featureType, dataType, ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { purposes } = useContext(FeaturesAttributesContext);

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["continuous"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = ["number"];
  if (
    !featureType ||
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType) ||
    !purposes.includes("core")
  ) {
    return null;
  }

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t(i18n.strings.title)}
      advanced={
        <div className={formSpacingYDefault}>
          <FeatureAttributeCycleLengthField
            featureType={featureType}
            dataType={dataType}
          />
          <FeatureAttributeSignificantDigitsField
            featureType={featureType}
            dataType={dataType}
          />
          <FeatureAttributeDecimalPlacesField
            featureType={featureType}
            dataType={dataType}
          />
        </div>
      }
    />
  );
};
