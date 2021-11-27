const tsPreset = require('ts-jest/jest-preset')
const mongodbPreset = require('@shelf/jest-mongodb/jest-preset')
module.exports = {
  ...tsPreset,
  ...mongodbPreset,
  coveragePathIgnorePatterns: ['/node_modules/'],
  modulePaths: ['<rootDir>/src'],
}
