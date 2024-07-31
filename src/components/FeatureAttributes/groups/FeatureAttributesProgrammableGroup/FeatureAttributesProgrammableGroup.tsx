import { FC } from "react";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import {
  FeatureAttributeDerivedFeatureCodeField,
  FeatureAttributePostProcessField,
} from "../../fields";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";
import { FeatureAttributesProgrammableGroupI18nBundle as i18n } from "./FeatureAttributesProgrammableGroup.i18n";
import { useTranslation } from "react-i18next";

export type FeatureAttributesProgrammableGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
>;
export const FeatureAttributesProgrammableGroup: FC<
  FeatureAttributesProgrammableGroupProps
> = ({ ...props }) => {
  const { t } = useTranslation(i18n.namespace);

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
