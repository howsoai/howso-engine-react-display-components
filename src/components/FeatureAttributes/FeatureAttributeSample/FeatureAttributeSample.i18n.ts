import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeSample";

const en = {
  modal: {
    title: "Sample",
  },
};

type Resource = typeof en;

export const FeatureAttributeSampleI18nBundle: I18nBundle<Languages, Resource> =
  {
    namespace,
    resources: { en },
    strings: getStringsForI18nBundleFromResource<Resource>(en),
  };
