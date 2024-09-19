import { FeatureAttributesIndex } from "../types";
import { getAllFeatureAttributeConfigurationIssues } from "./state";

describe("getAllFeatureAttributeConfigurationIssues", () => {
  describe("sensitivity", () => {
    const featureName = "testFeature";
    const features: FeatureAttributesIndex = {
      [featureName]: { type: "nominal", data_type: "string" },
    };
    it("should not require a subtype for nominal values when purposes does not include synthesis", () => {
      const issues = getAllFeatureAttributeConfigurationIssues(features, {
        purposes: ["core"],
      });
      expect(issues).toBeUndefined();
    });

    it("should require a subtype for nominal values when purposes include synthesis", () => {
      const issues = getAllFeatureAttributeConfigurationIssues(features, {
        purposes: ["core", "synthesis"],
      });
      if (!issues) {
        throw new Error("issues is undefined");
      }

      expect(issues[featureName]).toStrictEqual([
        { translationKey: "sensitiveSubtypeUndefined" },
      ]);
    });
  });
});
