import { type I18nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "../../constants";
import { TraineeCreationStepperI18nBundle } from "./TraineeCreationStepper";

export * from "./TraineeCreationStepper";
export * from "./TraineeIdentifiers";

export const TraineeI18nBundles: I18nBundle<Languages, any>[] = [
  TraineeCreationStepperI18nBundle,
];
