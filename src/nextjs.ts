import { type FixupPluginDefinition } from '@eslint/compat';
import { fixupPluginRules } from '@eslint/compat';
import { type Config, type RuleConfig } from '@eslint/config-helpers';
import nextJs from '@next/eslint-plugin-next';

const recommendedRules: Record<string, RuleConfig> = {};

for (const ruleName of Object.keys({ ...nextJs.configs.recommended.rules })) {
  recommendedRules[ruleName] = 'error';
}

const base: Config = {
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
