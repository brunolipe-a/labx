module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    "./**/src/**/*.{js,jsx,ts,tsx}",
    "!./**/src/setupTests.ts",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/jest.setup.js"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "lcov"
  ]
};
