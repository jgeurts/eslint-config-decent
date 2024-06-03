declare module 'eslint-plugin-testing-library' {
  import type { ESLint, Linter } from 'eslint';
  const value: ESLint.Plugin & {
    configs: {
      react: Linter.FlatConfig;
    };
  };
  export default value;
}
