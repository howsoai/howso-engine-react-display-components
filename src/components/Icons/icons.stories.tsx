import type { Meta, StoryObj } from "@storybook/react";
import { FC, ReactNode } from "react";
import { IconBaseProps } from "react-icons";
import { MapDependentsIcon } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<IconBaseProps> = {
  title: "Components/Icons",
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {},
  render: (args) => (
    <div className="flex gap-4">
      <IconWithLabel label={"MapDependentsIcon"} Icon={<MapDependentsIcon />} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<IconBaseProps>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

type IconWithLabelProps = { label: string; Icon: ReactNode };
const IconWithLabel: FC<IconWithLabelProps> = ({ label, Icon }) => (
  <div className="flex flex-col items-center justify-center">
    <div>{Icon}</div>
    <div>{label}</div>
  </div>
);
