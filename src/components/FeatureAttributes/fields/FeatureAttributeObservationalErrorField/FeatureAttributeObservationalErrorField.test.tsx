import { within, screen } from "@testing-library/react";
import { translations } from "./constants";

const labelRegex = new RegExp(`^${translations.label}.*`);

export const getFeatureAttributeObservationalErrorField = () =>
  screen.getByLabelText(labelRegex);
export const getFeatureAttributeObservationalErrorFieldInElement = (
  element: HTMLElement,
) => within(element).getByLabelText(labelRegex);

test.todo("Write a test");
