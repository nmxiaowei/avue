module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    amd: true,
    es2021: true,
    mocha: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-essential"],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "no-useless-escape": "off",
    "no-restricted-globals": ["error", "event", "fdescribe"],
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "prefer-const": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
  },
  overrides: [
    {
      files: ["*.ts"],
      plugins: ["@typescript-eslint"],
      rules: {
        "no-undef": "off",
        "no-unused-vars": "off",
        "prefer-const": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
      },
    },
    {
      files: ["*.vue"],
      rules: {
        "no-case-declarations": "off",
        "no-dupe-keys": "off",
        "no-extra-boolean-cast": "off",
        "no-extra-semi": "off",
        "no-inner-declarations": "off",
        "no-irregular-whitespace": "off",
        "no-redeclare": "off",
        "no-self-assign": "off",
        "no-undef": "off",
        "no-unreachable": "off",
        "vue/no-mutating-props": "off",
        "vue/no-unused-vars": "warn",
        "vue/no-use-v-if-with-v-for": "off",
        "vue/no-useless-template-attributes": "off",
        "vue/valid-attribute-name": "off",
        "vue/valid-template-root": "off",
      },
    },
    {
      files: ["*.cjs", "*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
