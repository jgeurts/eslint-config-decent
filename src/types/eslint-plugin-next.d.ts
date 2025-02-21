declare module '@next/eslint-plugin-next' {
  import type { TSESLint } from '@typescript-eslint/utils';

  const value: TSESLint.FlatConfig.Plugin & {
    configs: {
      recommended: TSESLint.FlatConfig.Config;
      'core-web-vitals': TSESLint.FlatConfig.Config;
    };
  };
  export default value;
}
