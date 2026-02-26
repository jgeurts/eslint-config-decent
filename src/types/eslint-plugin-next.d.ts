declare module '@next/eslint-plugin-next' {
  import { type Config, type Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      recommended: Config;
      'core-web-vitals': Config;
    };
  };
  export default value;
}
