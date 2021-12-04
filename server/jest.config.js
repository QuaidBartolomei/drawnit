const tsPreset = require('ts-jest/jest-preset')
const mongodbPreset = require('@shelf/jest-mongodb/jest-preset')
module.exports = {
  ...tsPreset,
  ...mongodbPreset,
  coveragePathIgnorePatterns: ['/node_modules/'],
  modulePaths: ['<rootDir>/src'],
  globalSetup: '<rootDir>/test/globalSetup.ts',
  globalTeardown: '<rootDir>/test/globalTeardown.ts',
  maxConcurrency: 2,
  setupFilesAfterEnv: ['<rootDir>/test/setupFile.ts'],
}
