/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('jest').Config} */

module.exports = {
  rootDir: __dirname,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/interfaces/*.spec.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage/unit',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json'
      }
    ]
  }
}
