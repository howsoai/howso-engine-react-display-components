import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import "@testing-library/jest-dom";
import { FeaturesAttributesCompact } from "./FeaturesAttributesCompact";
import { translations } from "./constants";
import {
  type FeatureAttributesIndex,
  getFeatureAttributesAreDirtyAtom,
  getFeatureAttributesIndexAtom,
  getFeatureAttributesSetAttributesAtom,
  getFeatureAttributesTimeFeatureAtom,
  getFeatureAttributesActiveFeatureAtom,
  getFeatureAttributesOptionsAtom,
} from "../hooks";
import { sleep } from "@/utils";
import { expectFeatureAttributeConfigurationInContainer } from "../FeatureAttributesConfiguration/FeatureAttributesConfiguration.test";
import { getFeatureAttributeObservationalErrorFieldInElement } from "../fields/FeatureAttributeObservationalErrorField/FeatureAttributeObservationalErrorField.test";

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
    const featureAttributesIndexAtom =
      getFeatureAttributesIndexAtom(featuresAttributes);
    const setFeatureAttributesAtom = getFeatureAttributesSetAttributesAtom({
      featureAttributesIndexAtom,
      featuresDirtyAtom,
    });
    const timeFeatureAtom = getFeatureAttributesTimeFeatureAtom({
      featureAttributesIndexAtom,
      featuresDirtyAtom,
    });

    render(
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        featureAttributesIndexAtom={featureAttributesIndexAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
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

  it("should disable the features field after any changes to attributes until an update is applied", async () => {
    const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
    const featureAttributesIndexAtom =
      getFeatureAttributesIndexAtom(featuresAttributes);
    const setFeatureAttributesAtom = getFeatureAttributesSetAttributesAtom({
      featureAttributesIndexAtom,
      featuresDirtyAtom,
    });
    const timeFeatureAtom = getFeatureAttributesTimeFeatureAtom({
      featureAttributesIndexAtom,
      featuresDirtyAtom,
    });

    render(
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        featureAttributesIndexAtom={featureAttributesIndexAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const featuresField = getFeatureField();
    expect(featuresField).toBeEnabled();
    expect(featuresField.value).toBe("");
    fireEvent.change(featuresField, { target: { value: firstFeature } });
    expect(featuresField.value).toBe(firstFeature);
    const [feature, attributes] = featureEntries[0];

    const container = getConfigurationContainer();
    await expectFeatureAttributeConfigurationInContainer(
      container,
      feature,
      attributes,
    );

    // Change a value in the form
    const allowNullsField = within(container).getByLabelText<HTMLInputElement>(
      new RegExp(
        `^FeatureAttributes.FeatureAttributeAllowNullsField.label\\*?$`,
      ),
    );
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
    const featureAttributesIndexAtom =
      getFeatureAttributesIndexAtom(featuresAttributes);
    const setFeatureAttributesAtom = getFeatureAttributesSetAttributesAtom({
      featureAttributesIndexAtom,
      featuresDirtyAtom,
    });
    const timeFeatureAtom = getFeatureAttributesTimeFeatureAtom({
      featureAttributesIndexAtom,
      featuresDirtyAtom,
    });

    render(
      <FeaturesAttributesCompact
        activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
        featureAttributesIndexAtom={featureAttributesIndexAtom}
        optionsAtom={getFeatureAttributesOptionsAtom({})}
        setFeatureAttributesAtom={setFeatureAttributesAtom}
        timeFeatureAtom={timeFeatureAtom}
      />,
    );

    const featuresField = getFeatureField();
    expect(featuresField).toBeEnabled();
    act(() => {
      fireEvent.change(featuresField, { target: { value: firstFeature } });
    });
    expect(featuresField.value).toBe(firstFeature);

    for (let i = 0; i <= featureEntries.length - 1; i++) {
      const [feature, attributes] = featureEntries[i];

      const container = getConfigurationContainer();
      await expectFeatureAttributeConfigurationInContainer(
        container,
        feature,
        attributes,
      );

      if (i <= featureEntries.length - 2) {
        const updateAndNext = within(container).getByRole("button", {
          name: new RegExp(`.*${translations.actions.updateAndGoToTarget}.*`),
        });
        expect(updateAndNext).toBeDisabled();

        // Make a change to a field present on all forms
        const value = Math.random().toFixed(2);
        const observationalErrorField =
          getFeatureAttributeObservationalErrorFieldInElement(container);
        act(() => {
          fireEvent.change(observationalErrorField, { target: { value } });
        });
        expect(observationalErrorField).toHaveValue(value);
        expect(updateAndNext).toBeEnabled();

        // Save and move on
        act(() => {
          fireEvent(
            updateAndNext,
            new MouseEvent("click", { bubbles: true, cancelable: true }),
          );
        });
      }
    }
  });
});

const getFeatureField = () =>
  screen.getByLabelText<HTMLSelectElement>(
    new RegExp(`^${translations.header.fields.feature.label}\\*?$`),
  );

const getConfigurationContainer = () =>
  screen.getByTestId("configuration-container");
