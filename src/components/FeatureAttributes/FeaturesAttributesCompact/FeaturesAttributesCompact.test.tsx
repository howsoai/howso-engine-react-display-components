import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { FeaturesAttributesCompact } from "./FeaturesAttributesCompact";
import { FeaturesAttributesCompactIl8nBundle as il8n } from "./FeaturesAttributesCompact.il8n";
import {
  getInferFeatureAttributesRunRequiredFields,
  getInferFeatureAttributesParamsAtom,
  getInferFeatureAttributesParamsTimeFeatureAtom,
  getFeatureAttributesActiveFeatureAtom,
} from "../hooks";
import { sleep } from "@/utils";
import { expectFeatureAttributeConfigurationInContainer } from "../FeatureAttributesConfiguration/FeatureAttributesConfiguration.test";
import { getFeatureAttributeObservationalErrorFieldInElement } from "../fields/FeatureAttributeObservationalErrorField/FeatureAttributeObservationalErrorField.test";
import { getFeatureAttributesAllowNullsFieldInContainer } from "../fields/FeatureAttributeAllowNullsField/FeatureAttributeAllowNullsField.test";
import { FeatureAttributesIndex, InferFeatureAttributesParams } from "../types";
import { getFeatureAttributesTemporalityGroup } from "../groups/FeatureAttributesTemporalityGroup/FeatureAttributesTemporalityGroup.test";

/* eslint jest/no-conditional-expect: "off" */

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
    const runRequiredAtom = getInferFeatureAttributesRunRequiredFields();
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
    const paramsAtom = getInferFeatureAttributesParamsAtom(params);
    const timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
      paramsAtom,
      runRequiredAtom,
    });

    render(
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        paramsAtom={paramsAtom}
        runRequiredAtom={runRequiredAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const featuresField = getFeatureField();
    expect(featuresField).toBeEnabled();
    expect(featuresField.value).toBe("");

    expect(screen.getByRole("alert")).toHaveTextContent(
      il8n.strings.state.unselected,
    );
  });

  it("should toggle the time feature on exposing temporal options", async () => {
    const runRequiredAtom = getInferFeatureAttributesRunRequiredFields();
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
    const paramsAtom = getInferFeatureAttributesParamsAtom(params);
    const timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
      paramsAtom,
      runRequiredAtom,
    });

    render(
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom(firstFeature)}
        paramsAtom={paramsAtom}
        runRequiredAtom={runRequiredAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const timeFeature = getTimeFeatureField();
    const updateButton = getUpdate();

    expect(timeFeature).toBeEnabled();
    expect(timeFeature).not.toBeChecked();
    expect(updateButton).toBeDisabled();

    fireEvent(
      timeFeature,
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
    expect(timeFeature).toBeChecked();

    const temporalityGroup = getFeatureAttributesTemporalityGroup();
    expect(temporalityGroup).toBeVisible();

    // Update and inspect
    fireEvent(
      updateButton,
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });

  it("should disable the features field after any changes to attributes until an update is applied", async () => {
    const runRequiredAtom = getInferFeatureAttributesRunRequiredFields();
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
    const paramsAtom = getInferFeatureAttributesParamsAtom(params);
    const timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
      paramsAtom,
      runRequiredAtom,
    });

    render(
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        paramsAtom={paramsAtom}
        runRequiredAtom={runRequiredAtom}
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
      name: new RegExp(`.*${il8n.strings.actions.update}$`),
    });
    fireEvent(
      update,
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
    await act(async () => sleep(300));
    expect(featuresField).toBeEnabled();
  });

  it("should open a configuration container, save, and load the next", async () => {
    const runRequiredAtom = getInferFeatureAttributesRunRequiredFields();
    const params: InferFeatureAttributesParams = {
      features: featuresAttributes,
    };
    const paramsAtom = getInferFeatureAttributesParamsAtom(params);
    const timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
      paramsAtom,
      runRequiredAtom,
    });

    render(
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        paramsAtom={paramsAtom}
        runRequiredAtom={runRequiredAtom}
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
        const update = getUpdate();
        const updateAndNext = getUpdateAndNext();

        expect(update).toBeDisabled();
        expect(updateAndNext).toBeDisabled();
        expect(featuresField).toBeEnabled();

        // Make a change to a field present on all forms
        const value = Math.random().toFixed(2);
        const observationalErrorField =
          getFeatureAttributeObservationalErrorFieldInElement(container);
        fireEvent.change(observationalErrorField, { target: { value } });

        expect(observationalErrorField).toHaveValue(value);
        expect(update).toBeEnabled();
        expect(updateAndNext).toBeEnabled();
        expect(featuresField).toBeDisabled();

        // Save and move on
        fireEvent(
          updateAndNext,
          new MouseEvent("click", { bubbles: true, cancelable: true }),
        );
        await act(async () => {
          await sleep(1000);
        });
        expect(getUpdate()).toBeDisabled();
        // Update and next does not appear on the last item
        if (i <= featureEntries.length - 3) {
          expect(getUpdateAndNext()).toBeDisabled();
        }
        expect(featuresField).toBeEnabled();
      }
    }
  });
});

const getFeatureField = () =>
  screen.getByLabelText<HTMLSelectElement>(
    new RegExp(`^${il8n.strings.header.fields.feature.label}\\*?$`),
  );

const getTimeFeatureField = () =>
  screen.getByLabelText<HTMLSelectElement>(
    new RegExp(`^${il8n.strings.header.fields.timeFeature.label}\\*?$`),
  );

const getUpdate = () =>
  screen.getByRole("button", {
    name: new RegExp(`.*${il8n.strings.actions.update}$`),
  });

const getUpdateAndNext = () =>
  screen.getByRole("button", {
    name: new RegExp(`.*${il8n.strings.actions["updateAndGoTo_{{target}}"]}.*`),
  });

const getConfigurationContainer = () =>
  screen.getByTestId("configuration-container");
