declare module 'eslint-plugin-react-hooks' {
  import type { Config, Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      flat: {
        'recommended-latest': Config;
      };
    };
  };
  export default value;
}
