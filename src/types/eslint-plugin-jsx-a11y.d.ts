declare module 'eslint-plugin-jsx-a11y' {
  import type { TSESLint } from '@typescript-eslint/utils';

  const value: TSESLint.FlatConfig.Plugin & {
    configs: {
      recommended: TSESLint.FlatConfig.Config;
    };
  };
  export default value;
}
