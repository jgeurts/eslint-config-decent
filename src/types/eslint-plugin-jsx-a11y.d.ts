declare module 'eslint-plugin-jsx-a11y' {
  import type { Config, Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      recommended: Config;
    };
  };
  export default value;
}
