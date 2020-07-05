module.exports = {
  globalSetup: "<rootDir>/node_modules/@databases/pg-test/jest/globalSetup.js",
  globalTeardown:
    "<rootDir>/node_modules/@databases/pg-test/jest/globalTeardown.js",
  maxConcurrency: 1,
  setupFilesAfterEnv: ["<rootDir>/packages/pg-taskq/test/setup.js"],
};
