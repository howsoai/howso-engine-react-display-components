import { type Languages } from "@/constants";
import { type I18nBundle } from "@howso/ui-internationalization-utils";
import { TraineeCreationStepperI18nBundle } from "./TraineeCreationStepper";

export * from "./TraineeCreationStepper";

export const TraineeI18nBundles: I18nBundle<Languages, any>[] = [
  TraineeCreationStepperI18nBundle,
];
