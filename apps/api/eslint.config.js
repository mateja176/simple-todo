import { config } from "@repo/lint-config";

export default [
  ...config,
  {
    ignores: ["dist/**"],
  },
];
