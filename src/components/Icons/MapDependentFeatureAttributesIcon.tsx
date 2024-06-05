import type { FC } from "react";
import { IconBaseProps } from "react-icons";
import { HiMap } from "react-icons/hi";

export const MapDependentFeatureAttributesIcon: FC<IconBaseProps> = function (
  props,
) {
  return <HiMap {...props} />;
};
