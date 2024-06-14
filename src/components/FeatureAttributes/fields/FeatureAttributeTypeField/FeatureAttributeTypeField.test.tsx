import { within, screen } from "@testing-library/react";
import { featureAttributeTypeLabel } from "./constants";

const labelRegex = new RegExp(`^${featureAttributeTypeLabel}.*`);

export const getFeatureTypeField = () => screen.getByLabelText(labelRegex);
export const getFeatureTypeFieldInElement = (element: HTMLElement) =>
  within(element).getByLabelText(labelRegex);

test.todo("Write a test");
