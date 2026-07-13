// Validates that every native-plugin rule in the oxlint config exists in
// the installed oxlint binary. Catches the class of bug where we reference
// rules that oxlint hasn't implemented yet.
//
// oxlint's --rules output uses internal scope names (e.g. "jest" for vitest,
// "jsx_a11y" for jsx-a11y, "eslint" for typescript extension rules), so we
// match by rule name rather than plugin/rule pair.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { type Plugin } from '@oxlint/plugins';
import { describe, expect, it } from 'vite-plus/test';

import { oxlintConfig } from '../src/index.js';
import decentPlugin from '../src/plugin.js';

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

  it('omits estree-dependent js plugins when enableTypeScriptEstreePlugins is false', () => {
    const config = oxlintConfig({ enableTypeScriptEstreePlugins: false });

    const jsPluginSpecifiers = (config.jsPlugins ?? []).map((entry) => (typeof entry === 'string' ? entry : entry.specifier));
    expect(jsPluginSpecifiers).not.toContain('@typescript-eslint/eslint-plugin');
    expect(jsPluginSpecifiers).not.toContain('@vitest/eslint-plugin');
    // eslint-plugin-testing-library imports @typescript-eslint/utils
    expect(jsPluginSpecifiers).not.toContain('eslint-plugin-testing-library');
    // Loadable plugins stay
    expect(jsPluginSpecifiers).toContain('eslint-plugin-security');
    expect(jsPluginSpecifiers).toContain('@stylistic/eslint-plugin');

    const allRuleKeys = [...Object.keys(config.rules ?? {}), ...(config.overrides ?? []).flatMap((override) => Object.keys(override.rules ?? {}))];
    expect(allRuleKeys.some((key) => key.startsWith('typescript-compat/'))).toBe(false);
    expect(allRuleKeys.some((key) => key.startsWith('vitest-compat/'))).toBe(false);
  });

  it('exposes the decent plugin with require-extension and require-index rules', () => {
    // Assignability check against the real oxlint plugin types
    const typedPlugin: Plugin = decentPlugin;
    expect(Object.keys(typedPlugin.rules)).toStrictEqual(['require-extension', 'require-index']);

    const config = oxlintConfig();
    expect(config.jsPlugins).toContainEqual({ name: 'decent', specifier: 'oxlint-config-decent/plugin' });
    expect(config.rules).toMatchObject({
      'decent/require-extension': 'error',
      'decent/require-index': 'error',
    });
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
