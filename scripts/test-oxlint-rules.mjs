#!/usr/bin/env node

// Validates that every native-plugin rule in the oxlint config exists in
// the installed oxlint binary. Catches the class of bug where we reference
// rules that oxlint hasn't implemented yet.
//
// oxlint's --rules output uses internal source names (e.g. "jest" for vitest,
// "jsx_a11y" for jsx-a11y, "eslint" for typescript extension rules), so we
// match by rule name rather than plugin/rule pair.

import { execSync } from 'node:child_process';

import { oxlintConfig } from '../dist/oxlint.mjs';

const config = oxlintConfig({
  enableReact: true,
  enableVitest: true,
  enableNextJs: true,
  enableTestingLibrary: true,
});

const nativePlugins = new Set(config.plugins);

function extractNativeRules(rules) {
  const result = [];
  for (const key of Object.keys(rules)) {
    const slash = key.indexOf('/');
    if (slash === -1) {
      continue;
    }

    const plugin = key.slice(0, slash);
    if (nativePlugins.has(plugin)) {
      result.push({ configKey: key, plugin, ruleName: key.slice(slash + 1) });
    }
  }

  return result;
}

const allRules = extractNativeRules(config.rules);
for (const override of config.overrides ?? []) {
  if (override.rules) {
    allRules.push(...extractNativeRules(override.rules));
  }
}

const seen = new Set();
const uniqueRules = allRules.filter((rule) => {
  if (seen.has(rule.configKey)) {
    return false;
  }

  seen.add(rule.configKey);
  return true;
});

const oxlintVersion = execSync('npx oxlint --version', { encoding: 'utf8' }).trim();
const rawOutput = execSync('npx oxlint --rules', { encoding: 'utf8' });
const availableRuleNames = new Set();
for (const line of rawOutput.split('\n')) {
  const match = line.match(/^\|\s+(\S+)\s+\|\s+(\S+)\s+\|/);
  if (!match) {
    continue;
  }

  const [, ruleName] = match;
  if (ruleName === 'Rule' || ruleName === '---') {
    continue;
  }

  availableRuleNames.add(ruleName);
}

const missing = [];
for (const rule of uniqueRules) {
  if (!availableRuleNames.has(rule.ruleName)) {
    missing.push(rule.configKey);
  }
}

/* eslint-disable no-console */
if (missing.length > 0) {
  console.error(`\n${missing.length} rule(s) in oxlint config not found in oxlint ${oxlintVersion}:\n`);
  for (const name of missing) {
    console.error(`  - ${name}`);
  }

  console.error('\nThese rules must be removed from src/oxlint.ts or moved to a -compat JS plugin.\n');
  process.exit(1);
}

console.log(`All ${uniqueRules.length} native-plugin rules verified against oxlint ${oxlintVersion}.`);
/* eslint-enable no-console */
