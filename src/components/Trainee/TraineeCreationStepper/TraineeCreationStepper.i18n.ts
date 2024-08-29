import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../constants";

const namespace = "TraineeCreationStepper";

const en = {
  load: {
    title: "Load",
    description: "Load and review source data",
  },
  define: {
    title: "Define",
    description: "Infer and describe features",
  },
  train: {
    title: "Train",
    description: "Tain and analyze data",
  },
};

type Resource = typeof en;

export const TraineeCreationStepperI18nBundle: I18nBundle<Languages, Resource> =
  {
    namespace,
    resources: { en },
    strings: getStringsForI18nBundleFromResource<Resource>(en),
  };
