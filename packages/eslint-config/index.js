import js from "@eslint/js";
import tseslint from "typescript-eslint";

export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-console": "warn",
    },
  },
];
