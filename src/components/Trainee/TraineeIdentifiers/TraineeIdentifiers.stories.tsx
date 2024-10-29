import type { Meta, StoryObj } from "@storybook/react";
import { TraineeIdentifiers } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TraineeIdentifiers> = {
  component: TraineeIdentifiers,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    name: "bath-reality-midnight",
    id: "2d0d1e36-7331-4176-bf35-59241fabde78",
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof TraineeIdentifiers>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const NoName: Story = {
  args: {
    name: undefined,
  },
};
