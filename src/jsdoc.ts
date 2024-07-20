import type { TSESLint } from '@typescript-eslint/utils';
import jsdoc from 'eslint-plugin-jsdoc';

const base: TSESLint.FlatConfig.Config = {
  settings: {
    jsdoc: {
      preferredTypes: {
        Array: 'Array<object>',
        'Array.': 'Array<object>',
        'Array<>': '[]',
        'Array.<>': '[]',
        'Promise.<>': 'Promise<>',
      },
    },
  },
  plugins: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    jsdoc,
  },
  rules: {
    'unicorn/better-regex': 'error',
    'unicorn/custom-error-definition': 'error',
    'unicorn/no-array-method-this-argument': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-set-has': 'error',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
