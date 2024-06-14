import { within, screen } from "@testing-library/react";
import { featureAttributeLocaleFieldLabel } from "./constants";

const regex = new RegExp(`^${featureAttributeLocaleFieldLabel}.*`);

export const findLocaleField = () => screen.findByLabelText(regex);
export const findLocaleFieldInElement = (element: HTMLElement) =>
  within(element).findByLabelText(regex);
export const getLocaleField = () => screen.getByLabelText(regex);
export const getLocaleFieldInElement = (element: HTMLElement) =>
  within(element).getByLabelText(regex);
export const queryLocaleField = () => screen.queryByLabelText(regex);
export const queryLocaleFieldInElement = (element: HTMLElement) =>
  within(element).queryByLabelText(regex);

test.todo("Write a test");
