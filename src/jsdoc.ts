import jsdoc from 'eslint-plugin-jsdoc';
import type { ConfigWithExtends } from 'typescript-eslint';

const base: ConfigWithExtends = {
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
