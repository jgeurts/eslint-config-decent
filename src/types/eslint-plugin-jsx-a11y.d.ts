declare module 'eslint-plugin-jsx-a11y' {
  import type { ESLint, Linter } from 'eslint';
  const value: ESLint.Plugin & {
    configs: {
      recommended: Linter.FlatConfig;
    };
  };
  export default value;
}
