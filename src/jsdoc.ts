import type { Config } from '@eslint/config-helpers';
import jsdoc from 'eslint-plugin-jsdoc';

const base: Config = {
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
    ...jsdoc.configs['flat/recommended'].rules,
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'error',
    'jsdoc/check-param-names': 'off',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/require-description': 'off',
    'jsdoc/require-description-complete-sentence': 'off',
    'jsdoc/require-example': 'off',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-param': [
      'error',
      {
        enableFixer: false,
        ignoreWhenAllParamsMissing: true,
        unnamedRootBase: ['args'],
      },
    ],
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/valid-types': 'error',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
