import type { Meta, StoryObj } from "@storybook/react";
import { FC, ReactNode } from "react";
import { IconBaseProps } from "react-icons";
import {
  InsightsIcon,
  MapDependentFeatureAttributesIcon,
  ProjectsIcon,
  SynthesisIcon,
  TraineeDefineIcon,
  TraineeIcon,
  TraineeLoadIcon,
  TraineeTrainIcon,
} from ".";

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
      <Section title="Action">
        <IconWithLabel
          label={"MapDependentFeatureAttributes"}
          Icon={<MapDependentFeatureAttributesIcon {...args} />}
        />
        <IconWithLabel
          label={"TraineeLoad"}
          Icon={<TraineeLoadIcon {...args} />}
        />
        <IconWithLabel
          label={"TraineeDefine"}
          Icon={<TraineeDefineIcon {...args} />}
        />
        <IconWithLabel
          label={"TraineeTrain"}
          Icon={<TraineeTrainIcon {...args} />}
        />
      </Section>
      <Section title="Concepts">
        <IconWithLabel label={"Insights"} Icon={<InsightsIcon {...args} />} />
        <IconWithLabel label={"Projects"} Icon={<ProjectsIcon {...args} />} />
        <IconWithLabel label={"Synthesis"} Icon={<SynthesisIcon {...args} />} />
        <IconWithLabel label={"Trainee"} Icon={<TraineeIcon {...args} />} />
      </Section>
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

type SectionProps = {
  title: ReactNode;
  children: ReactNode;
};
const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="my-3">
      <header>
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  );
};

type IconWithLabelProps = { label: string; Icon: ReactNode };
const IconWithLabel: FC<IconWithLabelProps> = ({ label, Icon }) => (
  <div className="flex flex-col items-center justify-center">
    <div>{Icon}</div>
    <div>{label}</div>
  </div>
);
