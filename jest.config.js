const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./"
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/components/(.*)$": "<rootDir>/src/components/$1"
    // '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    // '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
    // '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    // '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    // '^@/components/(.*)$': '<rootDir>/src/components/$1',
    // '^@/components/(.*)$': '<rootDir>/src/components/$1',
  },
  testEnvironment: "jest-environment-jsdom"
  // testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
  // moduleNameMapper: {
  //   '\\.(scss|sass|css)$': 'identity-obj-proxy'
  // }
}

module.exports = createJestConfig(customJestConfig)
