declare module 'eslint-plugin-mocha' {
  import { type Config, type Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      recommended: Config;
    };
  };
  export default value;
}
