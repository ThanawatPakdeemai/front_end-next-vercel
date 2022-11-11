/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// @ts-nocheck
// jest.config.js

const nextJest = require("next/jest")

function makeModuleNameMapper(srcPath, tsconfigPath) {
  // Get paths from tsconfig
  const { paths } = require(tsconfigPath).compilerOptions

  const aliases = {}

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach((item) => {
    const key = item.replace("/*", "/(.*)")
    const path = paths[item][0].replace("/*", "/$1")
    aliases[key] = `${srcPath}/${path}`
  })
  return aliases
}

const createJestConfig = nextJest({
  dir: "./"
})

const TS_CONFIG_PATH = "./tsconfig.json"
const MAIN_PATH = "<rootDir>/"

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "./tsconfig.jest.json"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json"
    }
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
  clearMocks: true,
  moduleNameMapper: makeModuleNameMapper(MAIN_PATH, TS_CONFIG_PATH),
  transform: {
    "<rootDir>/node_modules/@uiball/loaders": "babel-jest"
  },
  // coveragePathIgnorePatterns: ["<rootDir>/src/components/icons"],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 40,
      lines: 64,
      functions: 40
    }
  }
}

module.exports = createJestConfig(customJestConfig)
