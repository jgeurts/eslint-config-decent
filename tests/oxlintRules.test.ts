// Validates that every native-plugin rule in the oxlint config exists in
// the installed oxlint binary. Catches the class of bug where we reference
// rules that oxlint hasn't implemented yet.
//
// oxlint's --rules output uses internal scope names (e.g. "jest" for vitest,
// "jsx_a11y" for jsx-a11y, "eslint" for typescript extension rules), so we
// match by rule name rather than plugin/rule pair.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { oxlintConfig } from '../src/index.js';

interface NativeRule {
  configKey: string;
  plugin: string;
  ruleName: string;
}

function extractNativeRules(rules: Record<string, unknown>, nativePlugins: ReadonlySet<string>): NativeRule[] {
  const result: NativeRule[] = [];
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

describe('oxlintConfig', () => {
  it('enables the default feature plugins', () => {
    const config = oxlintConfig();

    expect(config.plugins).toContain('react');
    expect(config.plugins).toContain('jsx-a11y');
    expect(config.plugins).toContain('vitest');
    expect(config.plugins).not.toContain('nextjs');
    expect(config.options).toStrictEqual({ typeAware: true });
  });

  it('omits feature plugins when disabled', () => {
    const config = oxlintConfig({ enableReact: false, enableVitest: false, enableTestingLibrary: false });

    expect(config.plugins).not.toContain('react');
    expect(config.plugins).not.toContain('jsx-a11y');
    expect(config.plugins).not.toContain('vitest');
    expect(config.jsPlugins).not.toContain('eslint-plugin-testing-library');
  });

  it('references only native rules that exist in the installed oxlint', () => {
    const config = oxlintConfig({
      enableReact: true,
      enableVitest: true,
      enableNextJs: true,
      enableTestingLibrary: true,
    });

    const nativePlugins: ReadonlySet<string> = new Set(config.plugins ?? []);
    const allRules = extractNativeRules(config.rules ?? {}, nativePlugins);
    for (const override of config.overrides ?? []) {
      if (override.rules) {
        allRules.push(...extractNativeRules(override.rules, nativePlugins));
      }
    }

    const seen = new Set<string>();
    const uniqueRules = allRules.filter((rule) => {
      if (seen.has(rule.configKey)) {
        return false;
      }

      seen.add(rule.configKey);
      return true;
    });

    expect(uniqueRules.length).toBeGreaterThan(0);

    const oxlintBin = fileURLToPath(new URL('../node_modules/.bin/oxlint', import.meta.url));
    const rawOutput = execFileSync(oxlintBin, ['--rules', '--format=json'], { encoding: 'utf8' });
    const availableRules = JSON.parse(rawOutput) as { scope: string; value: string }[];
    const availableRuleNames = new Set<string>(availableRules.map((rule) => rule.value));

    expect(availableRuleNames.size).toBeGreaterThan(0);

    const missing = uniqueRules.filter((rule) => !availableRuleNames.has(rule.ruleName)).map((rule) => rule.configKey);

    // Rules listed here must be removed from src/index.ts or moved to a -compat JS plugin.
    expect(missing).toStrictEqual([]);
  });
});
