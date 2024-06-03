declare module 'eslint-plugin-react' {
  import type { ESLint, Linter } from 'eslint';
  const value: ESLint.Plugin & {
    configs: {
      recommended: Linter.FlatConfig;
    };
  };
  export default value;
}
