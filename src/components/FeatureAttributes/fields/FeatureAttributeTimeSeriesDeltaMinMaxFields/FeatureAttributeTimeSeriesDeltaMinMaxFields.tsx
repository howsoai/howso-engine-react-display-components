import { FC, useContext } from "react";
import { HelperText } from "flowbite-react";
import { type FeatureTimeSeriesTypeEnum } from "@howso/openapi-client";
import {
  FieldTextList,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesDeltaMinMaxFieldsIl8nBundle as il8n } from "./FeatureAttributeTimeSeriesDeltaMinMaxFields.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeTimeSeriesDeltaMinMaxFieldsProps =
  Partial<FieldTextProps> & {
    timeSeriesType: FeatureTimeSeriesTypeEnum | undefined;
  };
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.delta_min
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.delta_max
 */
export const FeatureAttributeTimeSeriesDeltaMinMaxFields: FC<
  FeatureAttributeTimeSeriesDeltaMinMaxFieldsProps
> = ({ timeSeriesType, ...props }) => {
  const { t } = useTranslation(il8n.namespace);
  const { fieldTextProps } = useContext(FeaturesAttributesContext);

  if (timeSeriesType !== "delta") {
    return null;
  }

  return (
    <div className={"space-y-1"}>
      <div className="flex gap-4">
        <FieldTextList
          {...fieldTextProps}
          name={"time_series.delta_min"}
          containerProps={{ className: "basis-1/2" }}
          label={t(il8n.strings.label.min)}
          placeholder="-1,-2,-3,-5,-7"
          valueAsNumber={true}
          {...props}
        />

        <FieldTextList
          {...fieldTextProps}
          name={"time_series.delta_max"}
          containerProps={{ className: "basis-1/2" }}
          label={t(il8n.strings.label.max)}
          placeholder="1,2,3,5,7"
          valueAsNumber={true}
          {...props}
        />
      </div>
      <HelperText color={"gray"}>{t(il8n.strings.help)}</HelperText>
    </div>
  );
};
