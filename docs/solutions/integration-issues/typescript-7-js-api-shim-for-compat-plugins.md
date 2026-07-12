---
title: 'TypeScript 7 breaks @typescript-eslint plugin loading — alias typescript to @typescript/typescript6'
date: 2026-07-12
category: integration-issues
---

## Symptom

With `typescript@7.x` as the installed TypeScript, running oxlint (or `vp lint`) with this config fails while loading a JS plugin:

```text
Failed to load JS plugin: @vitest/eslint-plugin
  TypeError: Cannot read properties of undefined (reading 'Cjs')
    at .../@typescript-eslint/typescript-estree/dist/create-program/shared.js:59
```

## Why

TypeScript 7 is the Go-native compiler. Its npm package ships a `tsc` binary but **no JS compiler API** (a new API is planned for 7.1).
`@typescript-eslint/typescript-estree` imports the `typescript` package as a library at module load, and its peer range caps at `<6.1.0`.
The `typescript-compat`, `vitest-compat`, and testing-library plugins all pull in `@typescript-eslint/utils` → `typescript-estree`, so
plugin loading crashes even though those compat rules are purely syntactic and never use type information (type-aware rules come from
`oxlint-tsgolint`, which drives the Go compiler directly).

## Solution: the official TS 6/7 side-by-side arrangement

Microsoft publishes [`@typescript/typescript6`](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-60),
which re-exports the TypeScript 6.0 JS API and renames its binary to `tsc6`. Alias `typescript` to it and install TS 7 under a separate
alias:

```jsonc
"devDependencies": {
  "@typescript/native": "npm:typescript@^7.0.2",
  "typescript": "npm:@typescript/typescript6@^6.0.2"
}
```

Result: `tsc` still resolves to TypeScript 7 (only `@typescript/typescript6` renames its bin, so there is no conflict), while
`import 'typescript'` yields the 6.0 API — typescript-estree's `<6.1.0` peer range is satisfied and every compat plugin loads. This repo
uses exactly that setup (`package.json` devDependencies), which is what lets `vp lint` dogfood the full default config.

Fallback for consumers who don't want the extra package: `oxlintConfig({ enableTypeScriptEstreePlugins: false })` drops the
estree-dependent plugins and their rules.

## What we tried first (and why it's gone)

- `overrides` in `pnpm-workspace.yaml` with a `pkg>typescript` selector — overrides do not rewrite peer-dependency resolution.
- `packageExtensions` adding `typescript` as a dependency — peer resolution still wins (`.pnpm` dir keeps the `_typescript@7.x` suffix).
- A `.pnpmfile.cjs` `readPackage` hook that rewrote the plugins' `typescript` peer into a private `typescript@6.0.3` dependency. This
  **worked** (all compat rules ran under TS7), but it was pnpm-only, invisible to other tooling, and every consumer would have to copy
  the hook. The official alias does the same thing in plain npm semantics.
- Disabling the plugins by default / removing them — rejected once the official side-by-side package made them loadable on TS7. The
  `enableTypeScriptEstreePlugins: false` opt-out remains for consumers who prefer fewer dependencies.

## Regression guard

`scripts/consumer-smoke-test.sh` (run by the `consumer_test` CI job) installs the packed tarball in a fresh npm project with the
side-by-side aliases and floating peer versions, then asserts through the real oxlint binary that the default config parses, a clean
file passes, and the decent + typescript-compat rules fire.
