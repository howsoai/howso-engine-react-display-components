import {
  FieldTextList,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC } from "react";
import { useDefaultTranslation } from "@/hooks";

export type FeatureAttributeTimeSeriesLagsFieldProps = Partial<FieldTextProps>;
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.lags
 */
export const FeatureAttributeTimeSeriesLagsField: FC<
  FeatureAttributeTimeSeriesLagsFieldProps
> = (props) => {
  const { t } = useDefaultTranslation();

  return (
    <FieldTextList
      name={"time_series.lags"}
      containerProps={{ className: "basis-1/2" }}
      label={t("FeatureAttributes.FeatureAttributeTimeSeriesLagsField.label")}
      placeholder="1,2,3,5,7"
      valueAsNumber={true}
      helperText={t(
        "FeatureAttributes.FeatureAttributeTimeSeriesLagsField.help",
      )}
      {...props}
    />
  );
};
