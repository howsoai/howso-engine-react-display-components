import { FC } from "react";
import { useDefaultTranslation } from "@/hooks";
import { HelperText } from "flowbite-react";
import {
  FieldTextList,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributeTimeSeriesRateMinMaxFieldsProps =
  Partial<FieldTextProps> & {
    timeSeriesType: string | undefined;
  };
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.rate_min
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.rate_max
 */
export const FeatureAttributeTimeSeriesRateMinMaxFields: FC<
  FeatureAttributeTimeSeriesRateMinMaxFieldsProps
> = ({ timeSeriesType, ...props }) => {
  const { t } = useDefaultTranslation();

  if (timeSeriesType !== "rate") {
    return null;
  }

  return (
    <div className={"space-y-1"}>
      <div className="flex gap-4">
        <FieldTextList
          name={"time_series.rate_min"}
          containerProps={{ className: "basis-1/2" }}
          label={t(
            "FeatureAttributes.FeatureAttributeTimeSeriesRateMinMaxFields.label.min",
          )}
          placeholder="-1,-2,-3,-5,-7"
          valueAsNumber={true}
          {...props}
        />

        <FieldTextList
          name={"time_series.rate_max"}
          containerProps={{ className: "basis-1/2" }}
          label={t(
            "FeatureAttributes.FeatureAttributeTimeSeriesRateMinMaxFields.label.max",
          )}
          placeholder="1,2,3,5,7"
          valueAsNumber={true}
          {...props}
        />
      </div>
      <HelperText color={"gray"}>
        {t("FeatureAttributes.FeatureAttributeTimeSeriesRateMinMaxFields.help")}
      </HelperText>
    </div>
  );
};
