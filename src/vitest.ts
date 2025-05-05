import type { TSESLint } from '@typescript-eslint/utils';
import vitest from '@vitest/eslint-plugin';

const base: TSESLint.FlatConfig.Config = {
  plugins: {
    vitest,
  },
  rules: {
    ...vitest.configs.recommended.rules,
    'vitest/consistent-test-it': [
      'error',
      {
        fn: 'it',
        withinDescribe: 'it',
      },
    ],
    'vitest/no-conditional-tests': 'error',
    'vitest/no-disabled-tests': 'error',
    'vitest/no-duplicate-hooks': 'error',
    'vitest/no-focused-tests': 'error',
    'vitest/no-standalone-expect': 'error',
    'vitest/no-test-prefixes': 'error',
    'vitest/padding-around-after-all-blocks': 'error',
    'vitest/padding-around-after-each-blocks': 'error',
    'vitest/padding-around-describe-blocks': 'error',
    'vitest/prefer-comparison-matcher': 'error',
    'vitest/prefer-equality-matcher': 'error',
    'vitest/prefer-hooks-in-order': 'error',
    'vitest/prefer-hooks-on-top': 'error',
    'vitest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
    'vitest/prefer-mock-promise-shorthand': 'error',
    'vitest/prefer-snapshot-hint': 'error',
    'vitest/prefer-spy-on': 'error',
    'vitest/prefer-strict-equal': 'error',
    'vitest/prefer-vi-mocked': 'error',
    'vitest/require-to-throw-message': 'error',
    'vitest/require-top-level-describe': 'error',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
