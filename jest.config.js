const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1'
    // '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    // '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
    // '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    // '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    // '^@/components/(.*)$': '<rootDir>/src/components/$1',
    // '^@/components/(.*)$': '<rootDir>/src/components/$1',
  },
  testEnvironment: 'jest-environment-jsdom'
  // testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
  // moduleNameMapper: {
  //   '\\.(scss|sass|css)$': 'identity-obj-proxy'
  // }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
