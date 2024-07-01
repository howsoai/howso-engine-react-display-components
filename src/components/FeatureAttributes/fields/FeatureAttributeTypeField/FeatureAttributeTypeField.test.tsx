import { within, screen } from "@testing-library/react";
import {
  featureAttributeTypeLabel,
  featureAttributeTypeOptions,
} from "./constants";
import { FeatureAttributes } from "@howso/openapi-client";

const labelRegex = new RegExp(`^${featureAttributeTypeLabel}.*`);

export const getFeatureTypeField = () => screen.getByLabelText(labelRegex);
export const getFeatureTypeFieldInElement = (element: HTMLElement) =>
  within(element).getByLabelText(labelRegex);

export const getFeatureTypeFieldRadios = () => ({
  continuous: screen.getByLabelText(
    featureAttributeTypeOptions.continuous.translations.label,
  ),
  nominal: screen.getByLabelText(
    featureAttributeTypeOptions.nominal.translations.label,
  ),
  ordinal: screen.getByLabelText(
    featureAttributeTypeOptions.ordinal.translations.label,
  ),
});
export const getFeatureTypeFieldRadiosInElement = (element: HTMLElement) => ({
  continuous: within(element).getByLabelText(
    featureAttributeTypeOptions.continuous.translations.label,
  ),
  nominal: within(element).getByLabelText(
    featureAttributeTypeOptions.nominal.translations.label,
  ),
  ordinal: within(element).getByLabelText(
    featureAttributeTypeOptions.ordinal.translations.label,
  ),
});

export const getFeatureTypeFieldRadio = (type: FeatureAttributes["type"]) => {
  const radios = getFeatureTypeFieldRadios();
  return radios[type];
};
export const getFeatureTypeFieldRadioInElement = (
  element: HTMLElement,
  type: FeatureAttributes["type"],
) => {
  const radios = getFeatureTypeFieldRadiosInElement(element);
  return radios[type];
};

test.todo("Write a test");
