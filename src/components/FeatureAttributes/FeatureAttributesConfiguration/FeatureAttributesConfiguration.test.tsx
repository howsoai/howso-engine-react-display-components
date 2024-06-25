import { getAllowedValuesFieldInElement } from "../fields/FeatureAttributeAllowedValuesField/FeatureAttributeAllowedValuesField.test";
import { getDataTypeFieldInElement } from "../fields/FeatureAttributeDataTypeField/FeatureAttributeDataTypeField.test";
import { getFeatureTypeFieldRadioInElement } from "../fields/FeatureAttributeTypeField/FeatureAttributeTypeField.test";
import { waitFor, within } from "@testing-library/react";
import { InferFeatureAttributesParams } from "../types";

it.todo("Write a test someday");

export const expectFeatureAttributeConfigurationInContainer = async (
  container: HTMLElement,
  feature: string,
  params: InferFeatureAttributesParams,
) => {
  const attributes = params.features?.[feature];
  if (!attributes) {
    throw new Error(`params.features?.[${feature}] is undefined`);
  }

  expect(container).toBeVisible();
  expect(within(container).getByRole("heading")).toHaveTextContent(
    "actions.configure_{{name}}",
  );
  await waitFor(() => {
    expect(within(container).getByRole("form").dataset.feature).toBe(feature);
  });
  const typeRadio = getFeatureTypeFieldRadioInElement(
    container,
    attributes.type || "",
  );
  expect(typeRadio).toBeChecked();
  expect(getDataTypeFieldInElement(container)).toHaveValue(
    attributes.data_type || "",
  );
  attributes.bounds?.allowed?.forEach((element) => {
    expect(
      getAllowedValuesFieldInElement(container, attributes.type),
    ).toHaveTextContent(element);
  });
};
