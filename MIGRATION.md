# Migration guide

## 3.x

Refactored translation system to use `@howso/ui-internationalization-utils` `I18nBundle`s.

To reduce overall bundle size, you are advised to specify components' bundles you use selectively in your `i18n` service:

```ts
import { FeatureAttributeSampleI18nBundle } from "@howso/howso-engine-react-display-components";

i18n
  // ...
  .init({
    resources: addI18nBundlesToResources(resources, [SkeletonI18nBundle]),
    // ...
  });
```

A naive export is available from this package that contains all bundles, though
its use is discouraged:

```ts
import { I18nBundles } from "@howso/howso-engine-react-display-components";

i18n
  // ...
  .init({
    resources: addI18nBundlesToResources(resources, [...I18nBundles]),
    // ...
  });
```

## 2.x

Flowbite updates 0.7 - 0.10

`tailwind.config.js` content path:

old: "node\*modules/flowbite-react/lib/esm/\*\*/\_.js"

new: "node\*modules/flowbite-react/dist/esm/\*\*/\_.mjs" - Please use (`flowbite.content()`)

```js
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    flowbite.content(),
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};
```

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
