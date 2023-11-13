module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "import"],
  extends: [
    "@react-native",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  globals: {
    __DEV__: false,
    jasmine: false,
    beforeAll: false,
    afterAll: false,
    beforeEach: false,
    afterEach: false,
    test: false,
    expect: false,
    describe: false,
    jest: false,
    it: false,
    JSX: false,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "react-hooks/exhaustive-deps": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [
      0,
      {
        ignoreTypeValueShadow: true,
      },
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "~app/**",
            group: "parent",
          },
          {
            pattern: "~assets/**",
            group: "parent",
          },
        ],
        groups: [
          ["external", "builtin"],
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
      },
    ],
  },
};
