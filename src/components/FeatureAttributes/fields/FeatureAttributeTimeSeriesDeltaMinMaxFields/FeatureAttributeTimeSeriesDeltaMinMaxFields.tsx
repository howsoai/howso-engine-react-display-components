import { FC, useContext } from "react";
import { useDefaultTranslation } from "@/hooks";
import { HelperText } from "flowbite-react";
import { type FeatureTimeSeriesTypeEnum } from "@howso/openapi-client";
import {
  FieldTextList,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

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
  const { t } = useDefaultTranslation();
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
          label={t(
            "FeatureAttributes.FeatureAttributeTimeSeriesDeltaMinMaxFields.label.min",
          )}
          placeholder="-1,-2,-3,-5,-7"
          valueAsNumber={true}
          {...props}
        />

        <FieldTextList
          {...fieldTextProps}
          name={"time_series.delta_max"}
          containerProps={{ className: "basis-1/2" }}
          label={t(
            "FeatureAttributes.FeatureAttributeTimeSeriesDeltaMinMaxFields.label.max",
          )}
          placeholder="1,2,3,5,7"
          valueAsNumber={true}
          {...props}
        />
      </div>
      <HelperText color={"gray"}>
        {t(
          "FeatureAttributes.FeatureAttributeTimeSeriesDeltaMinMaxFields.help",
        )}
      </HelperText>
    </div>
  );
};
