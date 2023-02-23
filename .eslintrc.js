module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "next",
    "plugin:jest/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "testing-library",
    "jest",
    "prettier"
  ],
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
        "**/"
      ],
      extends: ["plugin:testing-library/react"]
    }
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    semi: "off",
    "import/extensions": "off",
    "no-console": [
      process.env.NODE_ENV === "development" ? "warn" : "error",
      {
        allow: ["error"]
      }
    ],
    quotes: "off",
    "react/react-in-jsx-scope": "off",
    "import/no-duplicates": "error",
    "import/no-unresolved": [2, { caseSensitive: false }],
    "import/named": "error",
    "react/state-in-constructor": "off",
    "react/prop-types": "off",
    "react/no-access-state-in-setstate": "error",
    "react/no-danger": "off",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-will-update-set-state": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "react/jsx-no-bind": "error",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": "off",
    "react/function-component-definition": "off",
    "react/jsx-no-useless-fragment": "off",
    "dot-notation": "off",

    // overriding recommended rules
    "import/no-extraneous-dependencies": [
      "warn",
      {
        devDependencies: [
          "**/*.test.js",
          "**/*.spec.js",
          "**/*.test.tsx",
          "**/*.test.ts",
          "jest.setup.js",
          "**/*.stories.tsx"
        ]
      }
    ],
    "no-constant-condition": ["error", { checkLoops: false }],
    "no-unused-expressions": "off",
    "consistent-return": "off",
    "no-unused-vars": [
      process.env.NODE_ENV === "development" ? "error" : "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    "no-underscore-dangle": ["off"],
    "comma-dangle": "off",
    "no-shadow": "warn",
    "@typescript-eslint/no-shadow": ["warn"],
    "import/prefer-default-export": "off",
    "max-len": "warn",
    "react/jsx-max-props-per-line": [
      "warn",
      { maximum: { single: 1, multi: 2 } }
    ],
    "import/no-cycle": "off",
    "no-param-reassign": "off",
    "react/require-default-props": "off",
    "jest/no-commented-out-tests": "off",
    "import/no-named-as-default": "off",
    "jsx-a11y/anchor-is-valid": [
      "off",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"]
      }
    ],
    camelcase: "off",
    "react/no-unused-prop-types": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
}
