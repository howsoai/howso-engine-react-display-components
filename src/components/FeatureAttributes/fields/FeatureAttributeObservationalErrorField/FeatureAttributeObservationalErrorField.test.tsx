import { within, screen } from "@testing-library/react";

export const getFeatureAttributeObservationalErrorField = () =>
  screen.getByTestId("FeatureAttributeObservationalErrorField");
export const getFeatureAttributeObservationalErrorFieldInElement = (
  element: HTMLElement,
) => within(element).getByTestId("FeatureAttributeObservationalErrorField");

test.todo("Write a test");
