import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { FC, ReactNode } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { FeaturesAttributesContextProvider } from "../../FeaturesAttributesContext";
import { FeatureAttributeAllowNullsField } from "./FeatureAttributeAllowNullsField";
import { featureAttributeAllowNullsFieldName } from "./constants";

describe("AllowNullsField", () => {
  it("should be rendered with a default value of true if not in form context", async () => {
    render(
      <Wrapper>
        <FeatureAttributeAllowNullsField />
      </Wrapper>,
    );

    const field = getFeatureAttributesAllowNullsField();
    expect(field).toBeTruthy();
    expect(field).toBeChecked();
  });

  it("should be rendered checked if checked in form context", async () => {
    render(
      <Wrapper
        formProps={{
          defaultValues: { [featureAttributeAllowNullsFieldName]: true },
        }}
      >
        <FeatureAttributeAllowNullsField />
      </Wrapper>,
    );

    const field = getFeatureAttributesAllowNullsField();
    expect(field).toBeTruthy();
    expect(field).toBeChecked();
  });

  it("should be rendered unchecked if unchecked in form context", async () => {
    render(
      <Wrapper
        formProps={{
          defaultValues: { [featureAttributeAllowNullsFieldName]: false },
        }}
      >
        <FeatureAttributeAllowNullsField />
      </Wrapper>,
    );

    const field = getFeatureAttributesAllowNullsField();
    expect(field).toBeTruthy();
    expect(field).not.toBeChecked();
  });
});

const Wrapper: FC<{ children: ReactNode; formProps?: UseFormProps }> = ({
  children,
  formProps,
}) => {
  const form = useForm(formProps);
  return (
    <FeaturesAttributesContextProvider purposes={["core"]}>
      <FormProvider {...form}>{children}</FormProvider>
    </FeaturesAttributesContextProvider>
  );
};

const getFeatureAttributesAllowNullsField = () =>
  screen.getByTestId("FeatureAttributeAllowNullsField");

export const getFeatureAttributesAllowNullsFieldInContainer = (
  element: HTMLElement,
) => within(element).getByTestId("FeatureAttributeAllowNullsField");
