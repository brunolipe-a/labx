const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
const { name } = require('./package.json')

module.exports = {
  displayName: name,
  name,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/packages/web/src/' }),
  preset: 'ts-jest',
  setupFiles: ["./src/setupTests.ts"],
};
