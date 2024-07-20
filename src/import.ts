import type { TSESLint } from '@typescript-eslint/utils';
import importPlugin from 'eslint-plugin-import-x';

const base: TSESLint.FlatConfig.Config = {
  plugins: {
    import: importPlugin,
  },
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroupsExcludedImportTypes: ['builtin'],
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
