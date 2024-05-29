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

## Contributing

Development is done through [Storybook](https://storybook.js.org/).
You may start the UI for inspection with hot reloading using:

```bash
npm run storybook
```

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
