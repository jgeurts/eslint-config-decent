import type { Config, Plugin } from '@eslint/config-helpers';
import importPlugin from 'eslint-plugin-import-x';

const base: Config = {
  plugins: {
    import: importPlugin as unknown as Plugin,
  },
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
