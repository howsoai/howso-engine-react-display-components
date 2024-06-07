import { within, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  featureAttributeAllowedValuesFieldNominalLabel,
  featureAttributeAllowedValuesFieldOrdinalLabel,
} from "./constants";
import { FeatureAttributes } from "@howso/openapi-client";
import { FC, ReactNode } from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";
import { FeatureAttributeAllowedValuesField } from "./FeatureAttributeAllowedValuesField";

const nominalRegex = new RegExp(
  `^${featureAttributeAllowedValuesFieldNominalLabel}.*`,
);
const ordinalRegex = new RegExp(
  `^${featureAttributeAllowedValuesFieldOrdinalLabel}.*`,
);

export const getAllowedValuesField = (type: FeatureAttributes["type"]) =>
  screen.getByLabelText(type === "nominal" ? nominalRegex : ordinalRegex);
export const getAllowedValuesFieldInElement = (
  element: HTMLElement,
  type: FeatureAttributes["type"],
) =>
  within(element).getByLabelText(
    type === "nominal" ? nominalRegex : ordinalRegex,
  );

describe("FeatureAttributeAllowedValuesField", () => {
  it("should use allowed values if nominal strings", async () => {
    const defaultValues: FeatureAttributes = {
      type: "nominal",
      data_type: "string",
      bounds: { allowed: ["1234", "asdf"] },
    };
    render(
      <Wrapper formProps={{ defaultValues }}>
        <FeatureAttributeAllowedValuesField
          featureType={defaultValues.type}
          dataType={defaultValues.data_type}
          dateTimeFormat={undefined}
        />
      </Wrapper>,
    );

    expect(getAllowedValuesField(defaultValues.type)).toHaveValue(
      defaultValues.bounds?.allowed?.join("\n"),
    );
  });

  it("should use allowed values if nominal numbers", async () => {
    const defaultValues: FeatureAttributes = {
      type: "nominal",
      data_type: "number",
      bounds: { allowed: [2, 3] },
    };
    render(
      <Wrapper formProps={{ defaultValues }}>
        <FeatureAttributeAllowedValuesField
          featureType={defaultValues.type}
          dataType={defaultValues.data_type}
          dateTimeFormat={undefined}
        />
      </Wrapper>,
    );

    expect(getAllowedValuesField(defaultValues.type)).toHaveValue(
      defaultValues.bounds?.allowed?.join("\n"),
    );
  });

  it("should use allowed values if ordinal strings", async () => {
    const defaultValues: FeatureAttributes = {
      type: "ordinal",
      data_type: "string",
      bounds: { allowed: ["1234", "asdf"] },
    };
    render(
      <Wrapper formProps={{ defaultValues }}>
        <FeatureAttributeAllowedValuesField
          featureType={defaultValues.type}
          dataType={defaultValues.data_type}
          dateTimeFormat={undefined}
        />
      </Wrapper>,
    );

    expect(getAllowedValuesField(defaultValues.type)).toHaveValue(
      defaultValues.bounds?.allowed?.join("\n"),
    );
  });

  it("should use allowed values if ordinal numbers", async () => {
    const defaultValues: FeatureAttributes = {
      type: "ordinal",
      data_type: "number",
      bounds: { allowed: [2, 3] },
    };
    render(
      <Wrapper formProps={{ defaultValues }}>
        <FeatureAttributeAllowedValuesField
          featureType={defaultValues.type}
          dataType={defaultValues.data_type}
          dateTimeFormat={undefined}
        />
      </Wrapper>,
    );

    expect(getAllowedValuesField(defaultValues.type)).toHaveValue(
      defaultValues.bounds?.allowed?.join("\n"),
    );
  });
});

const Wrapper: FC<{ children: ReactNode; formProps?: UseFormProps }> = ({
  children,
  formProps,
}) => {
  const form = useForm(formProps);
  return <FormProvider {...form}>{children}</FormProvider>;
};