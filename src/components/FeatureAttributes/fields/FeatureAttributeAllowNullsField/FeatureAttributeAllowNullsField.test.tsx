import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FeatureAttributeAllowNullsField } from "./FeatureAttributeAllowNullsField";
import {
  featureAttributeAllowNullsFieldName,
  featureAttributeAllowNullsFieldLabel,
} from "./constants";
import { useForm, FormProvider, UseFormProps } from "react-hook-form";
import { FC, ReactNode } from "react";

describe("AllowNullsField", () => {
  it("should be rendered with a default value of true if not in form context", async () => {
    render(
      <Wrapper>
        <FeatureAttributeAllowNullsField />
      </Wrapper>,
    );

    const field = getField();
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

    const field = getField();
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

    const field = getField();
    expect(field).toBeTruthy();
    expect(field).not.toBeChecked();
  });
});

const Wrapper: FC<{ children: ReactNode; formProps?: UseFormProps }> = ({
  children,
  formProps,
}) => {
  const form = useForm(formProps);
  return <FormProvider {...form}>{children}</FormProvider>;
};

const getField = () =>
  screen.queryByLabelText(
    new RegExp(`^${featureAttributeAllowNullsFieldLabel}.*`),
  );
