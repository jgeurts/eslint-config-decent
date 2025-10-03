declare module 'eslint-plugin-react' {
  import type { Config, Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      all: Config;
      recommended: Config;
      'jsx-runtime': Config;
    };
  };
  export default value;
}
