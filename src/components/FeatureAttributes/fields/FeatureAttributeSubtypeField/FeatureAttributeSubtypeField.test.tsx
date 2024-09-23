import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FC, ReactNode } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import {
  FeatureAttributeSubtypeField,
  featureAttributeSubtypeFieldLabel,
} from "..";
import { FeaturesAttributesContextProvider } from "../../FeaturesAttributesContext";
import { InferFeatureAttributeFormValues } from "../../utils";

describe("SubtypeField", () => {
  it("should not be rendered for continuous feature types", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"continuous"}
        dataType={"string"}
        nonSensitive={false}
      />,
      renderProps,
    );

    expect(getField()).not.toBeInTheDocument();
  });

  it("should not be rendered for boolean", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"continuous"}
        dataType={"boolean"}
        nonSensitive={false}
      />,
      renderProps,
    );

    expect(getField()).not.toBeInTheDocument();
  });

  it("should not be rendered for string_mixable", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"continuous"}
        dataType={"string_mixable"}
        nonSensitive={false}
      />,
      renderProps,
    );

    expect(getField()).not.toBeInTheDocument();
  });

  it("should not be rendered for json", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"continuous"}
        dataType={"json"}
        nonSensitive={false}
      />,
      renderProps,
    );

    expect(getField()).not.toBeInTheDocument();
  });

  it("should not be rendered for yaml", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"continuous"}
        dataType={"yaml"}
        nonSensitive={false}
      />,
      renderProps,
    );

    expect(getField()).not.toBeInTheDocument();
  });

  it("should not be rendered for non-sensitive features", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"nominal"}
        dataType={"string"}
        nonSensitive={true}
      />,
      renderProps,
    );

    expect(getField()).not.toBeInTheDocument();
  });

  it("should be rendered for nominal sensitive string features", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"nominal"}
        dataType={"string"}
        nonSensitive={false}
      />,
      renderProps,
    );

    const field = getField();
    expect(field).toBeTruthy();
    // Would love test the actual options presence and usage, but
    // Cannot test datalist elements with user-event #1088
    // https://github.com/testing-library/user-event/issues/1088
  });

  it("should be rendered for nominal sensitive number features", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"nominal"}
        dataType={"string"}
        nonSensitive={false}
      />,
      renderProps,
    );

    const field = getField();
    expect(field).toBeTruthy();
  });

  it("should be rendered for ordinal sensitive string features", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"ordinal"}
        dataType={"string"}
        nonSensitive={false}
      />,
      renderProps,
    );

    const field = getField();
    expect(field).toBeTruthy();
  });

  it("should be rendered for ordinal sensitive number types", async () => {
    render(
      <FeatureAttributeSubtypeField
        featureType={"ordinal"}
        dataType={"string"}
        nonSensitive={false}
      />,
      renderProps,
    );

    const field = getField();
    expect(field).toBeTruthy();
  });

  it("should render a custom subtype as an option", async () => {
    const subtype = Math.random().toFixed(3);
    render(
      <Wrapper formProps={{ defaultValues: { subtype } }}>
        <FeatureAttributeSubtypeField
          featureType={"ordinal"}
          dataType={"string"}
          nonSensitive={false}
        />
        ,
      </Wrapper>,
    );

    const field = getField();
    expect(field).toBeTruthy();
    expect(field).toHaveValue(subtype);
  });
});

const Wrapper: FC<{
  children: ReactNode;
  formProps?: UseFormProps<InferFeatureAttributeFormValues>;
}> = ({ children, formProps }) => {
  const form = useForm<InferFeatureAttributeFormValues>(formProps);
  return (
    <FeaturesAttributesContextProvider purposes={["core", "synthesis"]}>
      <FormProvider {...form}>
        {children}
        <FeatureAttributeSubtypeField
          featureType={"continuous"}
          dataType={"string"}
          nonSensitive={false}
        />
      </FormProvider>
    </FeaturesAttributesContextProvider>
  );
};

const renderProps = { wrapper: Wrapper };

const getField = () =>
  screen.queryByLabelText(
    new RegExp(`^${featureAttributeSubtypeFieldLabel}.*`),
  );
