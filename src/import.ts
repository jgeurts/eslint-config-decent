import { type FixupPluginDefinition, fixupPluginRules } from '@eslint/compat';
import { type Config } from '@eslint/config-helpers';
import importPlugin from 'eslint-plugin-import-x';

const base: Config = {
  plugins: {
    import: fixupPluginRules(importPlugin as FixupPluginDefinition),
  },
  rules: {
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
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
