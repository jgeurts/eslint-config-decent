import { type UserConfig } from 'vite';
import { defineConfig } from 'vite-plus';

import { oxlintConfig } from './src/index.js';

const config: UserConfig = defineConfig({
  fmt: {
    arrowParens: 'always',
    bracketSpacing: true,
    printWidth: 200,
    quoteProps: 'as-needed',
    semi: true,
    useTabs: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    sortPackageJson: false,
    ignorePatterns: ['CHANGELOG.md'],
  },
  // Dogfood this package's own config. The repo uses TypeScript 7, so the
  // estree-dependent compat plugins cannot load (see the
  // enableTypeScriptEstreePlugins option); the 'decent' jsPlugin resolves via
  // package self-reference to dist, so `vp pack` must run before `vp lint`.
  // The cast bridges a type-level skew: vite-plus bundles oxlint 1.72 types
  // while this repo dev-depends on 1.73 (the version the parity tests target).
  // The config itself is JSON-compatible across both.
  lint: oxlintConfig({
    enableReact: false,
    enableNextJs: false,
    enableTestingLibrary: false,
    enableTypeScriptEstreePlugins: false,
  }) as NonNullable<UserConfig['lint']>,
  pack: {
    entry: ['src/index.ts', 'src/oxlint.ts', 'src/plugin.ts'],
    format: ['esm', 'cjs'],
    dts: { oxc: true },
    // Match the output layout referenced by package.json
    // (index.mjs + index.d.ts for ESM, index.cjs + index.d.cts for CJS).
    outExtensions: ({ format }) => (format === 'es' ? { js: '.mjs', dts: '.d.ts' } : { js: '.cjs', dts: '.d.cts' }),
  },
  staged: {
    '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}': ['vp fmt', 'vp lint --fix'],
    '*.md': ['vp fmt', 'markdownlint --config=.github/linters/.markdown-lint.yml --fix'],
    '*.{json,jsonc,json5,yml,yaml}': ['vp fmt --no-error-on-unmatched-pattern'],
  },
});

export default config;
