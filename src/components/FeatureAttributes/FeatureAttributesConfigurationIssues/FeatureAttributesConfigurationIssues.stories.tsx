import type { Meta, StoryObj } from "@storybook/react";
import { FeatureAttributesConfigurationIssues } from "./FeatureAttributesConfigurationIssues";
import { getFeaturesAttributesContextDecorator } from "../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { FeatureAttributesConfigurationIssuesI18nBundle } from "./FeatureAttributesConfigurationIssues.i18n";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributesConfigurationIssues> = {
  component: FeatureAttributesConfigurationIssues,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [getFeaturesAttributesContextDecorator()],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeatureAttributesConfigurationIssues>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    issues: [
      {
        translationKey:
          FeatureAttributesConfigurationIssuesI18nBundle.strings.typeUndefined,
      },
      {
        translationKey:
          FeatureAttributesConfigurationIssuesI18nBundle.strings
            .sensitiveSubtypeUndefined,
      },
    ],
  },
};
