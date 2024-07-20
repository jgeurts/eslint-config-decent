declare module 'eslint-plugin-testing-library' {
  import type { TSESLint } from '@typescript-eslint/utils';
  const value: TSESLint.FlatConfig.Plugin & {
    configs: {
      react: TSESLint.FlatConfig.Config;
    };
  };
  export default value;
}
