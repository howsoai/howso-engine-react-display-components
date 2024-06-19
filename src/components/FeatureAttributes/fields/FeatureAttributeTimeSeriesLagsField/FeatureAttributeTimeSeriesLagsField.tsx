import {
  FieldTextList,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useDefaultTranslation } from "@/hooks";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeTimeSeriesLagsFieldProps = Partial<FieldTextProps>;
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.lags
 */
export const FeatureAttributeTimeSeriesLagsField: FC<
  FeatureAttributeTimeSeriesLagsFieldProps
> = (props) => {
  const { t } = useDefaultTranslation();
  const { fieldTextProps } = useContext(FeaturesAttributesContext);

  return (
    <FieldTextList
      {...fieldTextProps}
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
