declare module 'eslint-plugin-testing-library' {
  import { type Config, type Plugin } from '@eslint/config-helpers';

  const value: Plugin & {
    configs: {
      'flat/angular': Config;
      'flat/dom': Config;
      'flat/react': Config;
      'flat/vue': Config;
    };
  };
  export default value;
}
