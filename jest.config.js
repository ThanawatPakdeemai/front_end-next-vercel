const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./"
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "@pages/(.*)": "<rootDir>/pages/$1",
    "@src/(.*)": "<rootDir>/src/$1",
    "@styles/(.*)": "<rootDir>/src/styles/$1",
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@configs/(.*)": "<rootDir>/src/configs/$1",
    "@constants/(.*)": "<rootDir>/src/constants/$1",
    "@feature/(.*)": "<rootDir>/src/features/$1",
    "@hooks/(.*)": "<rootDir>/src/hooks/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
    "@providers/(.*)": "<rootDir>/src/providers/$1",
    "@stores/(.*)": "<rootDir>/src/stores/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@public/(.*)": "<rootDir>/public/$1"
    // "^@/components/(.*)$": "<rootDir>/src/components/$1"
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
