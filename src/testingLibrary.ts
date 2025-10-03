import type { FixupPluginDefinition } from '@eslint/compat';
import { fixupPluginRules } from '@eslint/compat';
import type { Config } from '@eslint/config-helpers';
import testingLibrary from 'eslint-plugin-testing-library';

const base: Config = {
  plugins: {
    'testing-library': fixupPluginRules(testingLibrary as FixupPluginDefinition) as typeof testingLibrary,
  },
  rules: {
    ...testingLibrary.configs['flat/react'].rules,

    'testing-library/no-debugging-utils': 'error',
    'testing-library/prefer-explicit-assert': 'warn',
    'testing-library/prefer-implicit-assert': 'error',
    'testing-library/prefer-query-matchers': 'off',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
