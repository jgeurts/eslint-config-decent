declare module 'eslint-plugin-jest' {
  import type { Config, Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      'flat/all': Config;
      'flat/recommended': Config;
      'flat/style': Config;
    };
  };
  export default value;
}
