import type { ConfigWithExtends } from 'typescript-eslint';

const base: ConfigWithExtends = {
  rules: {
    'no-loss-of-precision': 'off',
    'no-loop-func': 'off',
    'no-return-await': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-defined': 'off',

    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        trailingUnderscore: 'forbid',
      },
    ],
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'signature',
          'private-field',
          'public-field',
          'protected-field',
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          'public-method',
          'protected-method',
          'private-method',
        ],
      },
    ],
    '@typescript-eslint/only-throw-error': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/parameter-properties': [
      'error',
      {
        allow: ['readonly'],
      },
    ],
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/sort-type-constituents': 'error',
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
