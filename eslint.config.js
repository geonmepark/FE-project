// eslint.config.js
import path from "node:path";
import globals from "globals";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  // 0) 검사에서 완전히 제외할 파일·폴더
  {
    ignores: [
      "eslint.config.js",
      "prettier.config.js",
      "vite.config.ts",
      "tsconfig*.json",
      "node_modules/**",
    ],
  }, // ─────────── 1. 기존 Extends 옮기기 ───────────
  ...compat.extends(
    "airbnb",
    "airbnb/hooks",
    "plugin:import/recommended", // 아래 2개 합침
    // "plugin:import/errors",
    // "plugin:import/warnings",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ), // ─────────── 2. 모든 JS/TS(X) 파일 공통 설정 ───────────
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      globals: {
        // 브라우저 전역 변수들과 최신 ES 전역, Node 전역을 모두 포함
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-var": "error",

      eqeqeq: "warn",
      "react/prop-types": "off",
      "no-extra-semi": "error",
      "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
      "arrow-parens": ["warn", "as-needed"],
      "no-unused-vars": "off",
      "no-console": "off",
      "import/prefer-default-export": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-pascal-case": "warn",
      "react/jsx-key": "warn",
      "react/no-array-index-key": "warn",
      "no-debugger": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "react/function-component-definition": [
        "error",
        { namedComponents: ["arrow-function", "function-declaration"] },
      ],
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-target-blank": "off",
      "react/prefer-stateless-function": "off",
      "react/jsx-one-expression-per-line": "off",
      "no-nested-ternary": "off",
      "react/jsx-curly-brace-presence": ["off", { props: "always", children: "ignore" }],
      "import/no-unresolved": "off",
      "react/jsx-props-no-spreading": ["warn", { custom: "ignore" }],
      "linebreak-style": "off",
      "import/extensions": "off",
      "no-use-before-define": "off",
      "import/no-extraneous-dependencies": "off",
      "no-shadow": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "import/newline-after-import": ["error", { count: 1 }],
      "react/require-default-props": "off",
      "react/no-unstable-nested-components": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          // & 구조분해할당에서 rest로 쓸 경우 앞에 변수 린트 무시
          ignoreRestSiblings: true,
          // & 언더스코어로 시작하는 변수 무시
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],

      // & 일반 요소에서 onclick 사용 (접근성 준수를 낮추는 거라 고려해봐야 함)
      // "jsx-a11y/click-events-have-key-events": "off",
      // "jsx-a11y/no-static-element-interactions": "off",
    },
  },
];
