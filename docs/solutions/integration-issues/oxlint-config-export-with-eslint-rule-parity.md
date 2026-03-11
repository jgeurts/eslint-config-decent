---
title: 'Add oxlint configuration generator as separate entry point in eslint-config-decent'
date: 2026-03-11
tags:
  - oxlint
  - eslint
  - linting
  - rule-mapping
  - tree-shaking
  - peer-dependencies
category: integration-issues
module: src/oxlint.ts
symptoms:
  - 'No automated way to mirror eslint-config-decent rules to oxlint'
  - 'Users must manually configure oxlint to match their ESLint setup'
  - 'ESLint-only users would pay bundle cost for oxlint data without separate entry point'
severity: low
status: implemented
---

## Problem

`eslint-config-decent` assembles rules from 14+ ESLint plugins
(core ESLint, typescript-eslint, import-x, unicorn, promise, jsdoc, stylistic,
security, react, react-hooks, jsx-a11y, next.js, vitest, and testing-library).
ESLint is thorough but slow. Oxlint, written in Rust, runs 50-100x faster
by natively implementing many of the same rules.

Users wanted to run oxlint with the identical rule set -- same severity,
same options, same file scoping -- without manually translating hundreds of
rules into oxlint's JSON format. The challenge: oxlint does not support every
rule natively. A solution needed to classify every rule, apply the correct
delivery mechanism, and present a single function call to the consumer.

## Approach

### Separate entry point

The oxlint config is exported as `eslint-config-decent/oxlint` -- a distinct build entry (`src/oxlint.ts`), independent of the
ESLint config. ESLint-only users don't bundle oxlint data.

### Three-tier rule delivery

1. **Native plugins** (`plugins` array): Rules oxlint implements in Rust.
   Full 50-100x speed benefit. Plugins: `eslint`, `typescript`, `unicorn`,
   `import`, `promise`, `jsdoc`, `react`, `jsx-a11y`, `nextjs`, `vitest`,
   `node`, `oxc`.

2. **Compat JS plugins** (`jsPlugins` with `{ name, specifier }` alias):
   For plugins with partial native support, gap rules use a `-compat` alias.
   Example: `@typescript-eslint/eslint-plugin` loads as `typescript-compat`,
   so `typescript-compat/` rules run through JS while native `typescript/`
   rules run in Rust. No collisions.

3. **Standalone JS plugins** (`jsPlugins` as bare strings):
   For plugins with zero native support (`eslint-plugin-security`,
   `eslint-plugin-testing-library`), the entire plugin runs in
   oxlint's JS runtime.

### Prefix mappings

Oxlint uses different prefixes than ESLint: `@typescript-eslint/` becomes `typescript/`, `react-hooks/`
becomes `react/`, `@next/next/` becomes `nextjs/`.

### Type-aware linting

Config sets `options.typeAware: true` for integration with `oxlint-tsgolint`, providing type-aware rules via TypeScript's Go port.

### Stylistic rules

Most `@stylistic/*` rules are formatting-only (handled by oxfmt/Prettier).
The structural rule `padding-line-between-statements` is included via
`stylistic-compat` since formatters don't enforce blank line placement.

## Implementation Details

**Declarative rule maps with spreads.** Each ESLint source module is represented as typed `Record<string, RuleEntry>` constants.
The `oxlintConfig()` function assembles the final config by spreading them:

```typescript
const rules: Record<string, RuleEntry> = {
  ...eslintBaseRules,
  ...eslintCjsEsmRules,
  ...typescriptExplicitRules,
  ...typescriptCompatRules,
  ...typescriptInheritedRules,
  ...importRules,
  ...importCompatRules,
  // ... etc
  ...(enableReact ? { ...reactRules, ...reactCompatRules, ...jsxA11yRules } : {}),
  ...(enableNextJs ? nextjsRules : {}),
};
```

**The `-compat` alias pattern.** Non-native rules use a `-compat` prefix alias bound to the npm package:

```typescript
{ name: 'typescript-compat', specifier: '@typescript-eslint/eslint-plugin' }
{ name: 'import-compat', specifier: 'eslint-plugin-import-x' }
{ name: 'unicorn-compat', specifier: 'eslint-plugin-unicorn' }
{ name: 'jsdoc-compat', specifier: 'eslint-plugin-jsdoc' }
{ name: 'stylistic-compat', specifier: '@stylistic/eslint-plugin' }
```

**File glob constants** for test file scoping:

```typescript
const VITEST_FILE_GLOBS = ['**/__tests__/**/*.ts', '**/__tests__/**/*.tsx', '**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'];
const TEST_FILE_GLOBS = [...VITEST_FILE_GLOBS, '**/*.tests.ts', '**/*.tests.tsx'];
```

**Conditional composition.** Feature flags (`enableReact`, `enableVitest`, `enableNextJs`, `enableTestingLibrary`) conditionally include plugins, jsPlugins, rules, and overrides.

## Key Files Changed

| File                           | Change                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `src/oxlint.ts`                | New ~740-line module with all rule maps and `oxlintConfig()` builder           |
| `build.config.ts`              | Added `src/oxlint` as second build entry point                                 |
| `package.json`                 | Added `./oxlint` export, optional peer deps for `oxlint` and `oxlint-tsgolint` |
| `README.md`                    | Oxlint usage section with setup, options, and type-aware linting docs          |
| `docs/oxlint-rule-coverage.md` | Per-rule coverage report (every ESLint rule with oxlint status)                |

## Coverage Results

| Delivery Mechanism       | Count | Description                               |
| ------------------------ | ----- | ----------------------------------------- |
| Native (Rust)            | 298   | Full speed in oxlint's Rust engine        |
| Compat (JS plugin alias) | 32    | Gap rules via `-compat` JS plugins        |
| Standalone JS plugin     | 36    | Full plugins with no native support       |
| Not available            | 27    | Deprecated rules, missing implementations |

Overall: 366 of 393 rules = **93% coverage**.

Notable per-plugin results:
TypeScript inherited 75/75 (100%), Next.js 21/21 (100%),
Import 5/5 (100%), JSDoc 23/23 (100%), Vitest 29/29 (100%),
Security 12/12 (100%), Testing Library 24/24 (100%).

The 27 "N/A" rules are primarily deprecated ESLint rules
(`no-new-object`, `no-extra-semi`), formatting rules handled
by oxfmt/Prettier, and unimplemented rules (`object-shorthand`,
`prefer-arrow-callback`, `no-restricted-syntax`).

## Prevention and Maintenance

### Preventing ESLint-to-oxlint drift

The core risk: `src/oxlint.ts` is a manually-maintained mirror of rules across 12+ ESLint source files. When a rule changes in
any ESLint source, the oxlint config silently falls out of sync.

**Recommended:** Create a build-time sync verification script that:

1. Imports the ESLint config with all options enabled
2. Calls `oxlintConfig()` with matching options
3. Extracts all rule names from both
4. Diffs against a known exclusion list of N/A rules
5. Fails CI if any ESLint rule is missing from both oxlint and the exclusion list

This is especially important for recommended config spreads (`...react.configs.recommended.rules`, `...vitest.configs.recommended.rules`, etc.)
where dependency bumps silently add new rules.

### Tracking compat-to-native promotion

32 rules currently run via `-compat` JS plugins. As oxlint adds native implementations:

1. Check oxlint changelogs on dependency bumps for newly implemented rules
2. Move promoted rules from `*CompatRules` to the native rules record
3. Update the prefix (e.g., `typescript-compat/naming-convention` to `typescript/naming-convention`)
4. Remove the JS plugin entry if it was the last compat rule using it

### Testing strategy

- **Type safety:** `oxlintConfig()` returns typed `OxlintConfig` -- TypeScript catches structural errors
- **Snapshot testing:** Call `oxlintConfig()` with various option combos and snapshot output
- **Runtime validation:** Run `oxlint --config <generated-config>` on a sample file in CI to validate the config loads
- **Parity drift detection:** The sync verification script described above

## Related Documents

- [Implementation plan](../../plans/2026-03-11-feat-oxlint-config-export-plan.md)
- [Rule coverage report](../oxlint-rule-coverage.md)

## Architecture Decision: Same Package vs. Separate

Decided to keep the oxlint config in `eslint-config-decent` (not a separate `oxlint-config-decent` package) because:

- The coupling is the feature -- oxlint config is a direct mirror of ESLint rules
- Same repo means they stay in sync with every release
- Tree-shaking via separate entry point means ESLint-only users don't bundle oxlint data
- Optional peer deps avoid warnings for ESLint-only users
- A separate package would create a coordination/version-alignment problem
