import type { TSESLint } from '@typescript-eslint/utils';

import { requireExtensionRule } from './rules/requireExtensionRule.js';
import { requireIndexRule } from './rules/requireIndexRule.js';

const base: TSESLint.FlatConfig.Config = {
  plugins: {
    'decent-extension': {
      meta: {
        name: 'decent-extension',
        version: '1.0.0',
      },
      rules: {
        'require-extension': requireExtensionRule,
        'require-index': requireIndexRule,
      },
    },
  },
  rules: {
    'decent-extension/require-extension': 'error',
    'decent-extension/require-index': 'error',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
