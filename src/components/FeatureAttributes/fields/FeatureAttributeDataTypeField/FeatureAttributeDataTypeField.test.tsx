import { within, screen } from "@testing-library/react";
import { FeatureAttributeDataTypeFieldIl8nBundle as il8n } from "./FeatureAttributeDataTypeField.il8n";

export const getDataTypeField = () =>
  screen.getByTestId("FeatureAttributeDataTypeField");
export const getDataTypeFieldInElement = (element: HTMLElement) =>
  within(element).getByTestId("FeatureAttributeDataTypeField");

test.todo("Write a test");
