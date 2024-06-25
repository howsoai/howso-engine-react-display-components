# Migration guide

## 1.x Feature Attributes updated to include Infer params

This breaking change modifies the data structures for FeatureAttributes.
All storage is now part of `InferFeatureAttributesParams` with attributes in `.features`.
Integration with `.strict_bounds` is complete.

Updates are based on the following signatures:

### FeaturesAttributesRows

```tsx
const params: InferFeatureAttributesParams = {
  features: featuresAttributes,
};
const features = Object.keys(featuresAttributes);

const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
const inferFeatureAttributesParamsAtom =
  getInferFeatureAttributesParamsAtom(params);
const setFeatureAttributesAtom =
  getInferFeatureAttributesParamsSetFeatureAttributesAtom({
    inferFeatureAttributesParamsAtom,
    featuresDirtyAtom,
  });
const setParamsAtom = getInferFeatureAttributesParamsSetParamAtom({
  inferFeatureAttributesParamsAtom,
});

const timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
  inferFeatureAttributesParamsAtom,
  featuresDirtyAtom,
});

render(
  <FeaturesAttributesRows
    activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
    inferFeatureAttributesParamsAtom={inferFeatureAttributesParamsAtom}
    optionsAtom={getFeatureAttributesOptionsAtom({})}
    setFeatureAttributesAtom={setFeatureAttributesAtom}
    setParamsAtom={setParamsAtom}
    timeFeatureAtom={timeFeatureAtom}
  />
);
```

### FeaturesAttributesCompact

```tsx
const featuresDirtyAtom = getFeatureAttributesAreDirtyAtom();
const params: InferFeatureAttributesParams = {
  features: featuresAttributes,
};
const inferFeatureAttributesParamsAtom =
  getInferFeatureAttributesParamsAtom(params);
const setFeatureAttributesAtom =
  getInferFeatureAttributesParamsSetFeatureAttributesAtom({
    inferFeatureAttributesParamsAtom,
    featuresDirtyAtom,
  });
const setParamsAtom = getInferFeatureAttributesParamsSetParamAtom({
  inferFeatureAttributesParamsAtom,
});
const timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
  inferFeatureAttributesParamsAtom,
  featuresDirtyAtom,
});

render(
  <FeaturesAttributesCompact
    activeFeatureAtom={getFeatureAttributesActiveFeatureAtom()}
    inferFeatureAttributesParamsAtom={inferFeatureAttributesParamsAtom}
    optionsAtom={getFeatureAttributesOptionsAtom({})}
    setFeatureAttributesAtom={setFeatureAttributesAtom}
    setParamsAtom={setParamsAtom}
    timeFeatureAtom={timeFeatureAtom}
  />
);
```

## 0.x Initial version
