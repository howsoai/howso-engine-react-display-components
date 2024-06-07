import type { Meta, StoryObj } from "@storybook/react";
import { FeatureAttributeTimeSeriesHasTerminatorsField } from "./FeatureAttributeTimeSeriesHasTerminatorsField";
import { getFormProviderDecorator } from "@/storybook";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeTimeSeriesHasTerminatorsField> = {
  component: FeatureAttributeTimeSeriesHasTerminatorsField,
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
    isIdFeature: true,
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeTimeSeriesHasTerminatorsField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const NonIdFeatures: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: { isIdFeature: false },
};

/** 🥚 */
export const Yes: Story = {
  render: () => (
    <div className="flex gap-2">
      <img
        alt="The Terminator"
        src="https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX190_CR0,2,190,281_.jpg"
      />
      <img
        alt="The Time Traveler's Wife"
        src="https://m.media-amazon.com/images/M/MV5BZTllOTBkZWUtNjg4YS00NTU0LWFhMDMtYWNkMGU3ODBjZGQ2XkEyXkFqcGdeQXVyMTUyOTc1NDYz._V1_QL75_UX190_CR0,0,190,281_.jpg"
      />
      <img
        alt="Groundhog Day"
        src="https://m.media-amazon.com/images/M/MV5BZWIxNzM5YzQtY2FmMS00Yjc3LWI1ZjUtNGVjMjMzZTIxZTIxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX190_CR0,1,190,281_.jpg"
      />
    </div>
  ),
};

/** 🥚 */
export const No: Story = {
  render: () => (
    <div className="flex gap-2">
      <img
        alt="Idiocracy"
        src="https://m.media-amazon.com/images/M/MV5BMWQ4MzI2ZDQtYjk3MS00ODdjLTkwN2QtOTBjYzIwM2RmNzgyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UY281_CR0,0,190,281_.jpg
      "
      />
      <img
        alt="Back to the Future"
        src="https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,7,190,281_.jpg"
      />
      <img
        alt="Hot Tub Time Machine"
        src="https://m.media-amazon.com/images/M/MV5BMTQwMjExODA4Ml5BMl5BanBnXkFtZTcwNTYwMDYxMw@@._V1_QL75_UY281_CR0,0,190,281_.jpg"
      />
    </div>
  ),
};
