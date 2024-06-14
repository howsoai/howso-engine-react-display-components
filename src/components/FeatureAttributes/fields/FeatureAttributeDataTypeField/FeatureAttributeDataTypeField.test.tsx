import { within, screen } from "@testing-library/react";
import { featureAttributeDataTypeFieldLabel } from "./constants";

const regex = new RegExp(`^${featureAttributeDataTypeFieldLabel}.*`);

export const getDataTypeField = () => screen.getByLabelText(regex);
export const getDataTypeFieldInElement = (element: HTMLElement) =>
  within(element).getByLabelText(regex);

test.todo("Write a test");
