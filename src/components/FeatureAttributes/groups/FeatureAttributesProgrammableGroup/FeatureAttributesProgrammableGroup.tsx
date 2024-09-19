import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import {
  FeatureAttributeDerivedFeatureCodeField,
  FeatureAttributePostProcessField,
} from "../../fields";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import { FeatureAttributesProgrammableGroupI18nBundle as i18n } from "./FeatureAttributesProgrammableGroup.i18n";

export type FeatureAttributesProgrammableGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
>;
export const FeatureAttributesProgrammableGroup: FC<
  FeatureAttributesProgrammableGroupProps
> = ({ ...props }) => {
  const { t } = useTranslation(i18n.namespace);
  const { purposes } = useContext(FeaturesAttributesContext);

  if (!purposes.includes("synthesis")) {
    return null;
  }

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t(i18n.strings.title)}
      advanced={
        <div className={formSpacingYDefault}>
          <FeatureAttributeDerivedFeatureCodeField />
          <FeatureAttributePostProcessField />
        </div>
      }
    />
  );
};
