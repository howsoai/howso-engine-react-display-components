import type { FC } from "react";
import { PropertyLabel, type PropertyLabelProps } from "./PropertyLabel";

export const LastTrainingStartedLabel: FC<
  Omit<PropertyLabelProps, "property">
> = (props) => <PropertyLabel {...props} property={"lastTrainingStarted"} />;
