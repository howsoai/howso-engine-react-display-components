import {
  FieldTextList,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesLagsFieldIl8nBundle as il8n } from "./FeatureAttributeTimeSeriesLagsField.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributeTimeSeriesLagsFieldProps = Partial<FieldTextProps>;
/**
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureTimeSeries.html#howso.openapi.models.FeatureTimeSeries.lags
 */
export const FeatureAttributeTimeSeriesLagsField: FC<
  FeatureAttributeTimeSeriesLagsFieldProps
> = (props) => {
  const { t } = useTranslation(il8n.namespace);
  const { fieldTextProps } = useContext(FeaturesAttributesContext);

  return (
    <FieldTextList
      {...fieldTextProps}
      name={"time_series.lags"}
      containerProps={{ className: "basis-1/2" }}
      label={t(il8n.strings.label)}
      placeholder="1,2,3,5,7"
      valueAsNumber={true}
      helperText={t(il8n.strings.help)}
      {...props}
    />
  );
};
