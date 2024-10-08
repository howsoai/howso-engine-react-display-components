module.exports = {
  collectCoverage: false, // See package.json script
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,js,vue}",
    "!<rootDir>/src/**.stories.{ts.js}",
    "!<rootDir>/node_modules/",
  ],
  coverageReporters: ["text", "cobertura"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  rootDir: "src",
  setupFiles: [
    "<rootDir>/../jest/setup/i18n.js",
    "<rootDir>/../jest/setup/config.js",
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
};
