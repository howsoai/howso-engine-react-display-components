import { within, screen } from "@testing-library/react";

export const getDataTypeField = () =>
  screen.getByTestId("FeatureAttributeDataTypeField");
export const getDataTypeFieldInElement = (element: HTMLElement) =>
  within(element).getByTestId("FeatureAttributeDataTypeField");

test.todo("Write a test");
