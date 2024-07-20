import type { TSESLint } from '@typescript-eslint/utils';
import mocha from 'eslint-plugin-mocha';

const base: TSESLint.FlatConfig.Config = {
  plugins: {
    mocha,
  },
  rules: {
    ...mocha.configs.recommended.rules,

    'max-classes-per-file': 'off',

    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/unbound-method': 'off',

    'mocha/no-exclusive-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-mocha-arrows': 'off',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
