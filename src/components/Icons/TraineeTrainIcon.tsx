import type { FC } from "react";
import { IconBase, type IconBaseProps } from "react-icons";

export const TraineeTrainIcon: FC<IconBaseProps> = function (props) {
  return (
    <IconBase fill="none" viewBox="0 0 20 18" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.484 6.166 13 4h6m0 0-3-3m3 3-3 3M1 14h5l1.577-2.253M1 4h5l7 10h6m0 0-3 3m3-3-3-3"
      />
    </IconBase>
  );
};
