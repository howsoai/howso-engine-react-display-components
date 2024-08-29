import { FieldText } from "@howso/react-tailwind-flowbite-components";
import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator } from "../../../../storybook";
import { getFeaturesAttributesContextDecorator } from "../../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { FeatureAttributesGroupBase } from "./FeatureAttributesGroupBase";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributesGroupBase> = {
  component: FeatureAttributesGroupBase,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    getFormProviderDecorator(),
    getFeaturesAttributesContextDecorator(),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    title: "Lorem ipsum",
    basic: (
      <>
        <FieldText
          label={"Name"}
          placeholder={"John"}
          helperText={"Lorem ipsum dolor sit amet.."}
        />
      </>
    ),
    advanced: (
      <>
        <FieldText
          label={"Grandfather's name"}
          placeholder={"Schmidt"}
          helperText={"Lorem ipsum dolor sit amet.."}
        />
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributesGroupBase>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};
