module.exports = {
  extends: "@gadgetinc/eslint-config",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"],
  },
  rules: {
    "lodash/import-scope": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "jest/no-deprecated-functions": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          Function: false,
          "{}": false,
        },
      },
    ],
  },
};
