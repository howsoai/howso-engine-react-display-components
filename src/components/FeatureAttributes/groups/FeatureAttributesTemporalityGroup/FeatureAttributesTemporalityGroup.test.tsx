import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { testId } from "./constants";
import { FeatureAttributesTemporalityGroup } from "./FeatureAttributesTemporalityGroup";
import { FC, ReactNode } from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";
import { FeaturesAttributesContextProvider } from "../../FeaturesAttributesContext";

describe("FeatureAttributesTemporalityGroup", () => {
  it("should include the temporality group", async () => {
    render(
      <Wrapper>
        <FeatureAttributesTemporalityGroup
          /** If any feature in the data has a time feature */
          featuresHaveTimeFeature={true}
          featureType={"continuous"}
          isIdFeature={false}
          /** time_series.time_feature */
          isTimeFeature={false}
          timeSeriesLags={undefined}
          timeSeriesOrder={undefined}
          timeSeriesType={undefined}
        />
      </Wrapper>,
    );

    const group = getFeatureAttributesTemporalityGroup();
    expect(group).toBeVisible();
  });
});

const Wrapper: FC<{ children: ReactNode; formProps?: UseFormProps }> = ({
  children,
  formProps,
}) => {
  const form = useForm(formProps);
  return (
    <FeaturesAttributesContextProvider>
      <FormProvider {...form}>{children}</FormProvider>
    </FeaturesAttributesContextProvider>
  );
};

export const getFeatureAttributesTemporalityGroup = () =>
  screen.getByTestId<HTMLDivElement>(testId);
