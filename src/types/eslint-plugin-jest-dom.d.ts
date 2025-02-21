declare module 'eslint-plugin-jest-dom' {
  import type { TSESLint } from '@typescript-eslint/utils';

  const value: TSESLint.FlatConfig.Plugin & {
    configs: {
      'flat/all': TSESLint.FlatConfig.Config;
      'flat/recommended': TSESLint.FlatConfig.Config;
    };
  };
  export default value;
}
