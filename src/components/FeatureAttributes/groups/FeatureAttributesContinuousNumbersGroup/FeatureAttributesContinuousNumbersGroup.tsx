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
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { useTranslation } from "react-i18next";
import { FeatureAttributesContinuousNumbersGroupIl8nBundle as il8n } from "./FeatureAttributesContinuousNumbersGroup.il8n";

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
  const { t } = useTranslation(il8n.namespace);

  const allowedFeatureTypes: FeatureAttributes["type"][] = ["continuous"];
  const allowedDataTypes: FeatureAttributes["data_type"][] = ["number"];
  if (
    !featureType ||
    !allowedFeatureTypes.includes(featureType) ||
    !allowedDataTypes.includes(dataType)
  ) {
    return null;
  }

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t(il8n.strings.title)}
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
