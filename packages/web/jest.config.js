const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
const { name } = require('./package.json')

module.exports = {
  displayName: name,
  name,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/packages/web/src/' }),
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/setupTests.ts",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/jest.setup.js"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "lcov"
  ],
  setupFilesAfterEnv: ["./src/setupTests.ts"],
};
