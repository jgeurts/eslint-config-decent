import type { Config } from '@eslint/config-helpers';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';

const base: Config = {
  plugins: {
    jest,
    'jest-dom': jestDom,
  },
  languageOptions: {
    ...jest.configs['flat/recommended'].languageOptions,
  },
  rules: {
    ...jest.configs['flat/recommended'].rules,
    'jest/max-nested-describe': 'error',
    'jest/no-conditional-in-test': 'error',
    'jest/no-confusing-set-timeout': 'error',
    'jest/no-test-prefixes': 'error',
    'jest/prefer-called-with': 'error',
    'jest/prefer-comparison-matcher': 'error',
    'jest/prefer-equality-matcher': 'error',
    'jest/prefer-hooks-in-order': 'error',
    'jest/prefer-hooks-on-top': 'error',
    'jest/prefer-mock-promise-shorthand': 'error',
    'jest/prefer-snapshot-hint': 'error',

    ...jestDom.configs['flat/recommended'].rules,
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-empty': 'error',
    'jest-dom/prefer-enabled-disabled': 'error',
    'jest-dom/prefer-focus': 'error',
    'jest-dom/prefer-in-document': 'error',
    'jest-dom/prefer-required': 'error',
    'jest-dom/prefer-to-have-attribute': 'error',
    'jest-dom/prefer-to-have-class': 'error',
    'jest-dom/prefer-to-have-style': 'error',
    'jest-dom/prefer-to-have-text-content': 'error',
    'jest-dom/prefer-to-have-value': 'error',

    'max-classes-per-file': 'off',

    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/unbound-method': 'off',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
