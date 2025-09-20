/** @type {import('prettier').Config} */
export default {
  semi: true,
  singleQuote: false, // 기본은 싱글쿼터 false
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  endOfLine: "auto",
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "avoid",
  // 필요하다면 추가 overrides
  overrides: [
    // 예시: Markdown 만다른 옵션
    {
      files: "*.md",
      options: { proseWrap: "always" },
    },
  ],
};
