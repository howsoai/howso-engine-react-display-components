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
    featureAttributeTypeOptions.continuous.translationKey,
  ),
  nominal: screen.getByLabelText(
    featureAttributeTypeOptions.nominal.translationKey,
  ),
  ordinal: screen.getByLabelText(
    featureAttributeTypeOptions.ordinal.translationKey,
  ),
});
export const getFeatureTypeFieldRadiosInElement = (element: HTMLElement) => ({
  continuous: within(element).getByLabelText(
    featureAttributeTypeOptions.continuous.translationKey,
  ),
  nominal: within(element).getByLabelText(
    featureAttributeTypeOptions.nominal.translationKey,
  ),
  ordinal: within(element).getByLabelText(
    featureAttributeTypeOptions.ordinal.translationKey,
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
