import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { FeaturesAttributesCompact } from "./FeaturesAttributesCompact";
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
import { sleep } from "@/utils";
import { expectFeatureAttributeConfigurationInContainer } from "../FeatureAttributesConfiguration/FeatureAttributesConfiguration.test";
import { getFeatureAttributeObservationalErrorFieldInElement } from "../fields/FeatureAttributeObservationalErrorField/FeatureAttributeObservationalErrorField.test";
import { getFeatureAttributesAllowNullsFieldInContainer } from "../fields/FeatureAttributeAllowNullsField/FeatureAttributeAllowNullsField.test";
import {
  FeatureAttributesIndex,
  InferFeatureAttributesParams,
} from "../types/api";
import { getFeatureAttributesTemporalityGroup } from "../groups/FeatureAttributesTemporalityGroup/FeatureAttributesTemporalityGroup.test";

describe("FeaturesAttributesCompact", () => {
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
  const featureEntries = Object.entries(featuresAttributes);
  const firstFeature = featureEntries[0][0];

  it("should include an alert to select a feature upon load", () => {
    const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
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
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        inferFeatureAttributesParamsAtom={inferFeatureAttributesParamsAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
        setParamsAtom={setParamsAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const featuresField = getFeatureField();
    expect(featuresField).toBeEnabled();
    expect(featuresField.value).toBe("");

    expect(screen.getByRole("alert")).toHaveTextContent(
      translations.state.unselected,
    );
  });

  it("should toggle the time feature on exposing temporal options", async () => {
    const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
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
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom(firstFeature)}
        inferFeatureAttributesParamsAtom={inferFeatureAttributesParamsAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
        setParamsAtom={setParamsAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const timeFeature = getTimeFeatureField();
    expect(timeFeature).toBeEnabled();
    expect(timeFeature).not.toBeChecked();
    fireEvent(
      timeFeature,
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
    expect(timeFeature).toBeChecked();
    const temporalityGroup = getFeatureAttributesTemporalityGroup();
    expect(temporalityGroup).toBeVisible();
  });

  it("should disable the features field after any changes to attributes until an update is applied", async () => {
    const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
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
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        inferFeatureAttributesParamsAtom={inferFeatureAttributesParamsAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
        setParamsAtom={setParamsAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const featuresField = getFeatureField();
    expect(featuresField).toBeEnabled();
    expect(featuresField.value).toBe("");
    fireEvent.change(featuresField, { target: { value: firstFeature } });
    expect(featuresField.value).toBe(firstFeature);
    const [feature] = featureEntries[0];

    const container = getConfigurationContainer();
    await expectFeatureAttributeConfigurationInContainer(
      container,
      feature,
      params,
    );

    // Change a value in the form
    const allowNullsField =
      getFeatureAttributesAllowNullsFieldInContainer(container);
    fireEvent.click(allowNullsField);

    expect(featuresField).not.toBeEnabled();

    const update = within(container).getByRole("button", {
      name: new RegExp(`.*${translations.actions.update}$`),
    });
    fireEvent(
      update,
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
    await act(async () => {
      await sleep(300);
    });
    expect(featuresField).toBeEnabled();
  });

  it("should open a configuration container, save, and load the next", async () => {
    const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
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
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        inferFeatureAttributesParamsAtom={inferFeatureAttributesParamsAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
        setParamsAtom={setParamsAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const featuresField = getFeatureField();
    expect(featuresField).toBeEnabled();
    fireEvent.change(featuresField, { target: { value: firstFeature } });
    expect(featuresField.value).toBe(firstFeature);

    for (let i = 0; i <= featureEntries.length - 1; i++) {
      const [feature] = featureEntries[i];

      const container = getConfigurationContainer();
      await expectFeatureAttributeConfigurationInContainer(
        container,
        feature,
        params,
      );

      if (i <= featureEntries.length - 2) {
        const updateAndNext = within(container).getByRole("button", {
          name: new RegExp(`.*${translations.actions.updateAndGoToTarget}.*`),
        });
        // eslint-disable-next-line jest/no-conditional-expect
        expect(updateAndNext).toBeDisabled();

        // Make a change to a field present on all forms
        const value = Math.random().toFixed(2);
        const observationalErrorField =
          getFeatureAttributeObservationalErrorFieldInElement(container);
        fireEvent.change(observationalErrorField, { target: { value } });
        // eslint-disable-next-line jest/no-conditional-expect
        expect(observationalErrorField).toHaveValue(value);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(updateAndNext).toBeEnabled();

        // Save and move on
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

const getFeatureField = () =>
  screen.getByLabelText<HTMLSelectElement>(
    new RegExp(`^${translations.header.fields.feature.label}\\*?$`),
  );

const getTimeFeatureField = () =>
  screen.getByLabelText<HTMLSelectElement>(
    new RegExp(`^${translations.header.fields.timeFeature.label}\\*?$`),
  );

const getConfigurationContainer = () =>
  screen.getByTestId("configuration-container");
