import {
  getStringsForI18nBundleFromResource,
  I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../constants";

const namespace = "EnginePropertyLabels";

const en = {
  feature: "Feature",
  features: "Features",
  lastTrainingStarted: "Last trained started",
  lastTrainingEnded: "Last training end",
  lastTrainingDuration: "Last training duration",
  numberOfFeatures: "Number of features",
  numberOfCases: "Number of cases",
  sourceType: "Source type",
  source: "Source",
  timeSeries: "Time series",
};

type Resource = typeof en;

export const EnginePropertyLabelsI18nBundle: I18nBundle<Languages, Resource> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
