import { FC } from "react";
import {
  FeatureAttributesGroupBase,
  FeatureAttributesGroupBaseProps,
} from "../FeatureAttributesGroupBase";
import {
  FeatureAttributeDerivedFeatureCodeField,
  FeatureAttributePostProcessField,
} from "../../fields";
import { useDefaultTranslation } from "@/hooks";
import { formSpacingYDefault } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributesProgrammableGroupProps = Omit<
  FeatureAttributesGroupBaseProps,
  "title" | "basic" | "advanced"
>;
export const FeatureAttributesProgrammableGroup: FC<
  FeatureAttributesProgrammableGroupProps
> = ({ sizing, ...props }) => {
  const { t } = useDefaultTranslation();

  return (
    <FeatureAttributesGroupBase
      {...props}
      title={t("FeatureAttributes.FeatureAttributesProgrammableGroup.title")}
      advanced={
        <div className={formSpacingYDefault}>
          <FeatureAttributeDerivedFeatureCodeField
          // sizing={sizing} TODO fix props and make happen
          />
          <FeatureAttributePostProcessField
          // sizing={sizing} TODO fix props and make happen
          />
        </div>
      }
    />
  );
};
