declare module 'eslint-plugin-react' {
  import type { TSESLint } from '@typescript-eslint/utils';

  const value: TSESLint.FlatConfig.Plugin & {
    configs: {
      all: TSESLint.FlatConfig.Config;
      recommended: TSESLint.FlatConfig.Config;
      'jsx-runtime': TSESLint.FlatConfig.Config;
    };
  };
  export default value;
}
