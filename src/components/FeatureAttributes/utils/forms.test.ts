import type { FeatureAttributes } from "@howso/openapi-client";
import {
  InferFeatureAttributeFormValues,
  getInferFeatureAttributeParamsFormValuesOnSubmit,
  getInferFeatureAttributesFromFormData,
} from "./forms";
import type { InferFeatureAttributesParams } from "../types";

describe("getInferFeatureAttributeParamsFormValuesOnSubmit", () => {
  it("should not reset the time feature property on submit", () => {
    const feature = "test";
    const params: InferFeatureAttributesParams = {
      features: {
        [feature]: {
          type: "continuous",
          data_type: "number",
          significant_digits: undefined,
          decimal_places: undefined,
          date_time_format: "",
          time_series: {
            type: "rate",
            time_feature: true,
          },
        },
      },
    };

    const data: InferFeatureAttributeFormValues = {
      ...params.features?.[feature],
      reserved: {
        boundingMode: "auto",
        isDateTime: true,
      },
    };
    // Remove the time_series.time_feature property as it is not part of the form's elements
    delete data.time_series?.time_feature;

    const updatedParams = getInferFeatureAttributeParamsFormValuesOnSubmit({
      data,
      feature,
      params,
    });
    expect(updatedParams.features?.[feature].time_series).toStrictEqual(
      params.features?.[feature].time_series,
    );
  });
});

describe("getFeatureAttributesFromFormData", () => {
  it("should remove empty values", () => {
    const data: InferFeatureAttributeFormValues = {
      type: "continuous",
      data_type: "number",
      reserved: {
        boundingMode: "auto",
        isDateTime: true,
      },
      significant_digits: undefined,
      decimal_places: undefined,
      date_time_format: "",
    };
    const attributes = getInferFeatureAttributesFromFormData(data);
    const toBeRemoved: (keyof FeatureAttributes)[] = [
      "significant_digits",
      "decimal_places",
      "date_time_format",
    ];
    toBeRemoved.forEach((property) => {
      expect(attributes).not.toHaveProperty(property);
    });
  });

  it("should not remove 0's", () => {
    const data: InferFeatureAttributeFormValues = {
      type: "continuous",
      data_type: "number",
      reserved: {
        boundingMode: "auto",
        isDateTime: true,
      },
      significant_digits: 0,
      decimal_places: 0,
    };
    const attributes = getInferFeatureAttributesFromFormData(data);
    const toBePreserve: (keyof FeatureAttributes)[] = [
      "significant_digits",
      "decimal_places",
    ];
    toBePreserve.forEach((property) => {
      expect(attributes[property]).toBe(0);
    });
  });

  it("should trim strings", () => {
    const data: InferFeatureAttributeFormValues = {
      type: "continuous",
      data_type: "string",
      date_time_format: "YYYY-MM-DD ",
      bounds: {
        allowed: ["This little ", "piggy went to ", "market "],
      },
      reserved: {
        boundingMode: "auto",
        isDateTime: true,
      },
    };
    const attributes = getInferFeatureAttributesFromFormData(data);
    expect(attributes.date_time_format).toBe(data.date_time_format?.trim());
    expect(attributes.bounds?.allowed?.join(" ")).toBe(
      data.bounds?.allowed?.map((value) => value.trim())?.join(" "),
    );
  });
});
