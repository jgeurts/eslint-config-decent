import type { Config } from '@eslint/config-helpers';
import a11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const base: Config = {
  settings: {
    react: {
      version: 'detect',
      runtime: 'automatic',
    },
  },
  languageOptions: {
    ...react.configs['jsx-runtime'].languageOptions,
  },
  plugins: {
    'jsx-a11y': a11y,
    react,
    'react-hooks': reactHooks,
  },
  rules: {
    ...a11y.configs.recommended.rules,
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',

    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    'react/default-props-match-prop-types': 'error',
    'react/display-name': ['error', { ignoreTranspilerName: false }],
    'react/forbid-foreign-prop-types': ['error', { allowInPropTypes: true }],
    'react/iframe-missing-sandbox': 'warn',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-arrow-function-lifecycle': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-namespace': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unsafe': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-class-component-methods': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-stateless-function': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/style-prop-object': 'error',

    ...reactHooks.configs.flat['recommended-latest'].rules,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
