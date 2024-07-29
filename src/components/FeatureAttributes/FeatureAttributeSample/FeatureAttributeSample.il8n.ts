import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeSample";

const en = {
  modal: {
    title: "Sample",
  },
};

type Resource = typeof en;

export const FeatureAttributeSampleIl8nBundle: Il8nBundle<Languages, Resource> =
  {
    namespace,
    resources: { en },
    strings: getStringsForIl8nBundleFromResource<Resource>(en),
  };