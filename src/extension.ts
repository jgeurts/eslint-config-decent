import type { ConfigWithExtends } from '@eslint/config-helpers';
import type { ESLint } from 'eslint';

import { requireExtensionRule } from './rules/requireExtensionRule.js';
import { requireIndexRule } from './rules/requireIndexRule.js';

const decentExtensionPlugin: ESLint.Plugin = {
  meta: {
    name: 'decent-extension',
    version: '1.0.0',
  },
  rules: {
    'require-extension': requireExtensionRule,
    'require-index': requireIndexRule,
  },
};

const base: ConfigWithExtends = {
  plugins: {
    'decent-extension': decentExtensionPlugin,
  } satisfies ConfigWithExtends['plugins'],
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
