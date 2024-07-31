import { FC, useContext } from "react";
import { HelperText } from "flowbite-react";
import {
  FieldTextList,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeTimeSeriesRateMinMaxFieldsI18nBundle as i18n } from "./FeatureAttributeTimeSeriesRateMinMaxFields.i18n";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextProps } = useContext(FeaturesAttributesContext);

  if (timeSeriesType !== "rate") {
    return null;
  }

  return (
    <div className={"space-y-1"}>
      <div className="flex gap-4">
        <FieldTextList
          {...fieldTextProps}
          name={"time_series.rate_min"}
          containerProps={{ className: "basis-1/2" }}
          label={t(i18n.strings.label.min)}
          placeholder="-1,-2,-3,-5,-7"
          valueAsNumber={true}
          {...props}
        />

        <FieldTextList
          {...fieldTextProps}
          name={"time_series.rate_max"}
          containerProps={{ className: "basis-1/2" }}
          label={t(i18n.strings.label.max)}
          placeholder="1,2,3,5,7"
          valueAsNumber={true}
          {...props}
        />
      </div>
      <HelperText color={"gray"}>{t(i18n.strings.help)}</HelperText>
    </div>
  );
};
