# Howso Engine React Display Components

A set of display components composed with business logic to support specific Howso engine functional interactions.

## Usage

To use this package in your application install it via npm.

### Installation

Standard package installation makes imports available:

```bash
npm i @howso/howso-engine-react-display-components
```

Import the styles and fonts must be installed in your application directly.

```ts
import "@howso/howso-engine-react-display-components/lib/styles.css";
```

Modify your `tailwind.config.js` configuration to include:

```js
import twContainerQueries from "@tailwindcss/container-queries";
import flowbite from "flowbite-react/tailwind";

module.exports = {
  content: [
    "node_modules/@howso/howso-engine-react-display-components/lib/index.esm.js",
    flowbite.content(),
    // ...
  ],
  plugins: [
    flowbite.plugin({ charts: true }),
    twContainerQueries,
    // ...
  ],
};
```

Translation files from this package must be installed into your public directory.
The suggested integration is trough setting up React I8ln's using `backend`:

```ts
{
  backend: {
    loadPath: "/locales/{{ns}}/{{lng}}.json",
  }
}
```

You will need the translation files from:

- [@howso/react-tailwind-flowbite-components](https://github.com/howsoai/react-tailwind-flowbite-components)

Translation files from this package must be included into your `i18n` `resources`:
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

## Contributing

Development is done through [Storybook](https://storybook.js.org/).
You may start the UI for inspection with hot reloading using:

```bash
npm run storybook
```

## Publishing

Documentation changes do not require a version publishing.
For functional changes, follow [SemVer](https://semver.org/)
standards updating the `package.json` and `package-lock.json`
files in your pull request.

When you are ready to publish a new version, use the Github Release action.

### Chromatic

[Chromatic](https://www.chromatic.com/builds?appId=6669ba40186e19f7f7c0af22) is used to review changes on this project.
You may [invite yourself](https://www.chromatic.com/start?inviteToken=chpi_1165ed0ce0ed4451bd5598cb035744ba&appId=6669ba40186e19f7f7c0af22) to the project.
