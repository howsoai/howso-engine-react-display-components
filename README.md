# Howso Engine React Display Components

A set of display components composed with business logic to support specific Howso engine functional interactions.

## Usage

To use this package in your application install it via npm.

### Prerequisites

Your home directory must contain a `.npmrc` file pointing to the Azure DevOps artifact feed:

```text
@howso:registry = https://dpbuild.jfrog.io/artifactory/api/npm/npm-virtual/
//dpbuild.jfrog.io/artifactory/api/npm/npm-virtual/:_auth=...
```

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
module.exports = {
  content: [
    "node_modules/@howso/howso-engine-react-display-components/lib/index.esm.js",
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

- This package
- `@howso/react-tailwind-flowbite-components`

## Contributing

Development is done through [Storybook](https://storybook.js.org/).
You may start the UI for inspection with hot reloading using:

```bash
npm run storybook
```

### Translations

This package produces a number of components that expose translations.
Any usages of translation should use the `useDefaultTranslation` function instead of `useTranslation`.
This will ensure translations are in the correct namespace for this package to be copied into implementing systems.

Using translations should be done sparingly. Copying the updated translation file is a manual process.
Translation changes should be considered breaking releases to signal this step and include a note in the [migration](./MIGRATION.md) file.

## Publishing

This package is published into a private npm registery.

Documentation changes do not require a version publishing.
For functional changes, follow [SemVer](https://semver.org/)
standards updating the `package.json` and `package-lock.json`
files in your pull request.

When you are ready to publish a new verison, use the Github Release action.

### Chromatic

[Chromatic]() is used to review changes on this project.
You may [invite yourself]() to the project.
