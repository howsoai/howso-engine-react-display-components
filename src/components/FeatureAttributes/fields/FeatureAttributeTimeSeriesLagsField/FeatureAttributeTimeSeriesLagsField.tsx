import {
  FieldTextList,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesLagsFieldI18nBundle as i18n } from "./FeatureAttributeTimeSeriesLagsField.i18n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeTimeSeriesLagsFieldProps = Partial<FieldTextProps>;
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.lags
 */
export const FeatureAttributeTimeSeriesLagsField: FC<
  FeatureAttributeTimeSeriesLagsFieldProps
> = (props) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextProps } = useContext(FeaturesAttributesContext);

  return (
    <FieldTextList
      {...fieldTextProps}
      name={"time_series.lags"}
      containerProps={{ className: "basis-1/2" }}
      label={t(i18n.strings.label)}
      placeholder="1,2,3,5,7"
      valueAsNumber={true}
      helperText={t(i18n.strings.help)}
      {...props}
    />
  );
};
