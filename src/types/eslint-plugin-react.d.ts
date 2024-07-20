declare module 'eslint-plugin-react' {
  import type { TSESLint } from '@typescript-eslint/utils';
  const value: TSESLint.FlatConfig.Plugin & {
    configs: {
      recommended: TSESLint.FlatConfig.Config;
    };
  };
  export default value;
}
