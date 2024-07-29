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
import { FeatureAttributesProgrammableGroupIl8nBundle as il8n } from "./FeatureAttributesProgrammableGroup.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributesProgrammableGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
>;
export const FeatureAttributesProgrammableGroup: FC<
  FeatureAttributesProgrammableGroupProps
> = ({ ...props }) => {
  const { t } = useTranslation(il8n.namespace);

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t(il8n.strings.title)}
      advanced={
        <div className={formSpacingYDefault}>
          <FeatureAttributeDerivedFeatureCodeField />
          <FeatureAttributePostProcessField />
        </div>
      }
    />
  );
};
