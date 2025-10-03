declare module 'eslint-plugin-jest-dom' {
  import type { Config, Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      'flat/all': Config;
      'flat/recommended': Config;
    };
  };
  export default value;
}
