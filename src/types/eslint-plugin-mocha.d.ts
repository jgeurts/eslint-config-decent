declare module 'eslint-plugin-mocha' {
  import type { Config, Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      recommended: Config;
    };
  };
  export default value;
}
