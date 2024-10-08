module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  "root": true,
  extends: "eslint:recommended",
  parser: 'babel-eslint',
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    ecmaVersion: 2018,
    allowImportExportEverywhere:true
  },
  rules: {
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-continue": "off",
    "camelcase": "off",
    "no-empty": "off",
    "no-param-reassign": "off",
    "func-names": ["error", "never"],
    "prefer-destructuring": [
      "error",
      {
        "object": false,
        "array": false,
      },
    ],
    "indent": ["error", "tab", { SwitchCase: 1 }],
    "linebreak-style": 0,
    "quotes": ["error", "single", { allowTemplateLiterals: true }],
    "semi": ["error", "always"],
    "spaced-comment": [
      "error",
      "always",
      {
        exceptions: ["-", "+"],
      },
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_",
      },
    ],
  },
};
