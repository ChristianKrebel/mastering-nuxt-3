module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "vue/multi-word-component-names": "off",
    "prettier/prettier": "error",
  },
}
