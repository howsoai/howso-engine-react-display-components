import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FeaturesAttributesRows } from "./FeaturesAttributesRows";
import { translations } from "./constants";
import {
  getFeatureAttributesAreDirtyAtom,
  getInferFeatureAttributesParamsAtom,
  getInferFeatureAttributesParamsSetFeatureAttributesAtom,
  getInferFeatureAttributesParamsTimeFeatureAtom,
  getFeatureAttributesActiveFeatureAtom,
  getFeatureAttributesOptionsAtom,
  getInferFeatureAttributesParamsSetParamAtom,
} from "../hooks";
import { expectFeatureAttributeConfigurationInContainer } from "../FeatureAttributesConfiguration/FeatureAttributesConfiguration.test";
import type {
  FeatureAttributesIndex,
  InferFeatureAttributesParams,
} from "../types";

describe("FeaturesAttributesRows", () => {
  const featuresAttributes: FeatureAttributesIndex = {
    age: {
      type: "continuous",
      data_type: "number",
      decimal_places: 0,
      sample: "22",
      bounds: {
        min: 20,
        max: 148,
        allow_null: false,
      },
    },
    sex: {
      type: "nominal",
      data_type: "string",
      non_sensitive: true,
      sample: "male",
      bounds: {
        allowed: ["male", "female", "twin soul"],
        allow_null: false,
      },
    },
    location: {
      type: "nominal",
      data_type: "string",
      subtype: "address",
      non_sensitive: false,
      sample:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      bounds: {
        allow_null: true,
      },
    },
  };

  it("should contain a row for each feature", async () => {
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
    const features = Object.keys(featuresAttributes);

    const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
    const inferFeatureAttributesParamsAtom =
      getInferFeatureAttributesParamsAtom(params);
    const setFeatureAttributesAtom =
      getInferFeatureAttributesParamsSetFeatureAttributesAtom({
        inferFeatureAttributesParamsAtom,
        featuresDirtyAtom,
      });
    const setParamsAtom = getInferFeatureAttributesParamsSetParamAtom({
      inferFeatureAttributesParamsAtom,
    });

    const timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
      inferFeatureAttributesParamsAtom,
      featuresDirtyAtom,
    });

    render(
      <FeaturesAttributesRows
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        inferFeatureAttributesParamsAtom={inferFeatureAttributesParamsAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
        setParamsAtom={setParamsAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const table = screen.getByRole("table");
    const featureRows = within(table).getAllByRole("row").slice(1);
    expect(featureRows.length).toBe(features.length);
    features.forEach((feature) => {
      within(table).getByText(feature);
    });
  });

  it("should open a configuration modal, save, and load the next", async () => {
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
    const featureEntries = Object.entries(featuresAttributes);

    const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
    const inferFeatureAttributesParamsAtom =
      getInferFeatureAttributesParamsAtom(params);
    const setFeatureAttributesAtom =
      getInferFeatureAttributesParamsSetFeatureAttributesAtom({
        inferFeatureAttributesParamsAtom,
        featuresDirtyAtom,
      });
    const setParamsAtom = getInferFeatureAttributesParamsSetParamAtom({
      inferFeatureAttributesParamsAtom,
    });
    const timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
      inferFeatureAttributesParamsAtom,
      featuresDirtyAtom,
    });

    render(
      <FeaturesAttributesRows
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        inferFeatureAttributesParamsAtom={inferFeatureAttributesParamsAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
        setParamsAtom={setParamsAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const featureRows = screen.getAllByRole("row").slice(1);
    expect(featureRows.length).toBe(featureEntries.length);

    const configure = within(featureRows[0]).getByRole("button", {
      name: new RegExp(`.*${translations.actions.configure}.*`),
    });
    fireEvent(
      configure,
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );

    for (let i = 0; i <= featureEntries.length - 1; i++) {
      const [feature] = featureEntries[i];

      const modal = screen.getByRole("dialog");
      await expectFeatureAttributeConfigurationInContainer(
        modal,
        feature,
        params,
      );
      if (i <= featureEntries.length - 2) {
        const updateAndNext = within(modal).getByRole("button", {
          name: new RegExp(`.*${translations.actions.updateAndGoToTarget}.*`),
        });
        // eslint-disable-next-line jest/no-conditional-expect
        expect(updateAndNext).toBeEnabled();
        fireEvent(
          updateAndNext,
          new MouseEvent("click", { bubbles: true, cancelable: true }),
        );
      }
    }
  });
});
