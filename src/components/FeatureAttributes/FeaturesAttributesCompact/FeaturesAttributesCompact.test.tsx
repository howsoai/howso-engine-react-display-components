import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { FeaturesAttributesCompact } from "./FeaturesAttributesCompact";
import { FeatureAttributes } from "@howso/openapi-client";
import { getAllowedValuesFieldInElement } from "../fields/FeatureAttributeAllowedValuesField/FeatureAttributeAllowedValuesField.test";
import { getDataTypeFieldInElement } from "../fields/FeatureAttributeDataTypeField/FeatureAttributeDataTypeField.test";
import { getFeatureTypeFieldInElement } from "../fields/FeatureAttributeTypeField/FeatureAttributeTypeField.test";
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
import {
  FeatureAttributeFormValues,
  getFeatureAttributesFromFormData,
} from "../utils";

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

    expect(screen.getByRole("alert")).toHaveTextContent(
      translations.state.unselected,
    );
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

    const firstFeature = featureEntries[0][0];
    expect(featuresField.value).toBe("");
    fireEvent.change(featuresField, { target: { value: firstFeature } });
    expect(featuresField.value).toBe(firstFeature);

    for (let i = 0; i <= featureEntries.length - 1; i++) {
      const [feature, attributes] = featureEntries[i];

      const container = screen.getByTestId("configuration-container");
      await expectFeatureAttributesInContainer(container, feature, attributes);
      if (i <= featureEntries.length - 2) {
        const updateAndNext = within(container).getByRole("button", {
          name: new RegExp(`.*${translations.actions.updateAndGoToTarget}.*`),
        });
        fireEvent(
          updateAndNext,
          new MouseEvent("click", { bubbles: true, cancelable: true }),
        );
      }
    }
  });
});

const expectFeatureAttributesInContainer = async (
  container: HTMLElement,
  feature: string,
  attributes: FeatureAttributes,
) => {
  expect(container).toBeVisible();
  expect(within(container).getByRole("heading")).toHaveTextContent(
    "actions.configure_{{name}}",
  );
  await waitFor(() => {
    expect(within(container).getByRole("form").dataset.feature).toBe(feature);
  });
  expect(getFeatureTypeFieldInElement(container)).toHaveValue(
    attributes.type || "",
  );
  expect(getDataTypeFieldInElement(container)).toHaveValue(
    attributes.data_type || "",
  );
  attributes.bounds?.allowed?.forEach((element) => {
    expect(
      getAllowedValuesFieldInElement(container, attributes.type),
    ).toHaveTextContent(element);
  });
};

describe("getFeatureAttributesFromFormData", () => {
  it("should remove empty values", () => {
    const data: FeatureAttributeFormValues = {
      type: "continuous",
      data_type: "number",
      is_datetime: false,
      significant_digits: undefined,
      decimal_places: undefined,
      date_time_format: "",
    };
    const attributes = getFeatureAttributesFromFormData(data);
    const toBeRemoved: (keyof FeatureAttributes)[] = [
      "significant_digits",
      "decimal_places",
      "date_time_format",
    ];
    toBeRemoved.forEach((property) => {
      expect(attributes).not.toHaveProperty(property);
    });
  });

  it("should not remove 0's", () => {
    const data: FeatureAttributeFormValues = {
      type: "continuous",
      data_type: "number",
      is_datetime: false,
      significant_digits: 0,
      decimal_places: 0,
    };
    const attributes = getFeatureAttributesFromFormData(data);
    const toBePreserve: (keyof FeatureAttributes)[] = [
      "significant_digits",
      "decimal_places",
    ];
    toBePreserve.forEach((property) => {
      expect(attributes[property]).toBe(0);
    });
  });

  it("should trim strings", () => {
    const data: FeatureAttributeFormValues = {
      type: "continuous",
      data_type: "string",
      is_datetime: true,
      date_time_format: "YYYY-MM-DD ",
      bounds: {
        allowed: ["This little ", "piggy went to ", "market "],
      },
    };
    const attributes = getFeatureAttributesFromFormData(data);
    expect(attributes.date_time_format).toBe(data.date_time_format?.trim());
    expect(attributes.bounds?.allowed?.join(" ")).toBe(
      data.bounds?.allowed?.map((value) => value.trim())?.join(" "),
    );
  });
});

const getFeatureField = () =>
  screen.getByLabelText(
    new RegExp(`^${translations.header.fields.feature.label}\s*\\*?$`),
  ) as HTMLSelectElement;
