import { FC } from "react";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import {
  FeatureAttributeCycleLengthField,
  FeatureAttributeDecimalPlacesField,
  FeatureAttributeSignificantDigitsField,
} from "../../fields";
import { FeatureAttributes } from "@howso/openapi-client";
import { useDefaultTranslation } from "@/hooks";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributesContinuousNumbersGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
> & {
  featureType: FeatureAttributes["type"];
  dataType: FeatureAttributes["data_type"];
};
export const FeatureAttributesContinuousNumbersGroup: FC<
  FeatureAttributesContinuousNumbersGroupProps
> = ({ featureType, dataType, ...props }) => {
  const { t } = useDefaultTranslation();

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["continuous"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = ["number"];
  if (
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t(
        "FeatureAttributes.FeatureAttributesContinuousNumbersGroup.title",
      )}
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