import type { FC } from "react";
import { type IconBaseProps } from "react-icons";
import { HiOutlineCubeTransparent } from "react-icons/hi2";

/**
 * A generic Trainee icon.
 * Where possible, an Identicon should be used.
 * An appropriate usage contexts would include:
 * - Create a trainee actions
 **/
export const TraineeIcon: FC<IconBaseProps> = (props) => (
  <HiOutlineCubeTransparent {...props} />
);
