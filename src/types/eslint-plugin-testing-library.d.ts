declare module 'eslint-plugin-testing-library' {
  import type { TSESLint } from '@typescript-eslint/utils';

  const value: TSESLint.FlatConfig.Plugin & {
    configs: {
      'flat/angular': TSESLint.FlatConfig.Config;
      'flat/dom': TSESLint.FlatConfig.Config;
      'flat/react': TSESLint.FlatConfig.Config;
      'flat/vue': TSESLint.FlatConfig.Config;
    };
  };
  export default value;
}
