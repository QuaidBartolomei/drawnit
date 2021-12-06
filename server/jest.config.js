const tsPreset = require('ts-jest/jest-preset')
module.exports = {
  ...tsPreset,
  coveragePathIgnorePatterns: ['/node_modules/'],
  modulePaths: ['<rootDir>/src'],
  globalSetup: '<rootDir>/test/globalSetup.ts',
  globalTeardown: '<rootDir>/test/globalTeardown.ts',
  maxConcurrency: 2,
  setupFilesAfterEnv: ['<rootDir>/test/setupFile.ts'],
}
