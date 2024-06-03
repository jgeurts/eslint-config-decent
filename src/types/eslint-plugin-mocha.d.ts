declare module 'eslint-plugin-mocha' {
  import type { ESLint, Linter } from 'eslint';
  const value: ESLint.Plugin & {
    configs: {
      recommended: Linter.FlatConfig;
    };
  };
  export default value;
}
