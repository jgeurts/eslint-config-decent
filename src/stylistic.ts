import { type Config } from '@eslint/config-helpers';
import stylistic from '@stylistic/eslint-plugin';

const baseStylistic = stylistic.configs.customize({
  braceStyle: '1tbs',
  jsx: true,
});

const base: Config = {
  ...baseStylistic,
  rules: {
    ...stylistic.configs['disable-legacy'].rules,
    ...baseStylistic.rules,
    '@stylistic/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['directive', 'block', 'block-like', 'multiline-block-like', 'cjs-export', 'cjs-import', 'class', 'export', 'import', 'if'],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: 'directive',
        next: 'directive',
      },
      {
        blankLine: 'any',
        prev: '*',
        next: ['if', 'for', 'cjs-import', 'import'],
      },
      {
        blankLine: 'any',
        prev: ['export', 'import'],
        next: ['export', 'import'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['try', 'function', 'switch'],
      },
      {
        blankLine: 'always',
        prev: 'if',
        next: 'if',
      },
      {
        blankLine: 'never',
        prev: ['return', 'throw'],
        next: '*',
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
