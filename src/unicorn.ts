import type { TSESLint } from '@typescript-eslint/utils';
import unicorn from 'eslint-plugin-unicorn';

const base: TSESLint.FlatConfig.Config = {
  plugins: {
    unicorn,
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
