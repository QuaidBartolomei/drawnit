module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  modulePaths: ['<rootDir>/src'],
  globalSetup: '<rootDir>/test/globalSetup.ts',
  globalTeardown: '<rootDir>/test/globalTeardown.ts',
  maxConcurrency: 2,
  setupFilesAfterEnv: ['<rootDir>/test/setupFile.ts'],
}
