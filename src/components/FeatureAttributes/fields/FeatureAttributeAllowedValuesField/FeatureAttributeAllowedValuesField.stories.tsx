import type { Meta, StoryObj } from "@storybook/react";
import { FeatureAttributeAllowedValuesField } from "./FeatureAttributeAllowedValuesField";
import { getFormProviderDecorator } from "@/storybook";
import { FC, ReactNode } from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";
import { FeatureAttributes } from "@howso/openapi-client";

const defaultValues: FeatureAttributes = {
  type: "nominal",
  data_type: "string",
  bounds: { allowed: ["1234", "asdf"] },
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeAllowedValuesField> = {
  component: FeatureAttributeAllowedValuesField,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [getFormProviderDecorator()],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    featureType: defaultValues.type,
    dataType: defaultValues.data_type,
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeAllowedValuesField>;

const Wrapper: FC<{ children: ReactNode; formProps?: UseFormProps }> = ({
  children,
  formProps,
}) => {
  const form = useForm(formProps);
  return <FormProvider {...form}>{children}</FormProvider>;
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
  render: () => (
    <Wrapper formProps={{ defaultValues }}>
      <FeatureAttributeAllowedValuesField
        featureType={defaultValues.type}
        dataType={defaultValues.data_type}
        dateTimeFormat={undefined}
      />
    </Wrapper>
  ),
};
