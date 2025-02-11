import type { FixupPluginDefinition } from '@eslint/compat';
import { fixupPluginRules } from '@eslint/compat';
import nextJs from '@next/eslint-plugin-next';
import type { TSESLint } from '@typescript-eslint/utils';

const recommendedRules: Record<string, TSESLint.FlatConfig.RuleEntry> = {};

for (const ruleName of Object.keys({ ...nextJs.configs.recommended.rules })) {
  recommendedRules[ruleName] = 'error';
}

const base: TSESLint.FlatConfig.Config = {
  plugins: {
    '@next/next': fixupPluginRules(nextJs as FixupPluginDefinition),
  },
  rules: {
    ...recommendedRules,
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
