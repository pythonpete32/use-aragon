module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "standard-with-typescript", "prettier"],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": ["off"],
    "@typescript-eslint/strict-boolean-expressions": ["off"],
    "react/no-unescaped-entities": ["off"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/restrict-template-expressions": ["off"],
    "@typescript-eslint/triple-slash-reference": ["off"],
  },
  settings: {
    react: { version: "detect" },
  },
};
