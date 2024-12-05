import type { FC } from "react";
import { IconBaseProps } from "react-icons";
import { HiCollection } from "react-icons/hi";

export const ProjectsIcon: FC<IconBaseProps> = function (props) {
  return <HiCollection {...props} />;
};
