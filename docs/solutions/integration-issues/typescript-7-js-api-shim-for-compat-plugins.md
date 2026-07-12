---
title: 'TypeScript 7 breaks @typescript-eslint plugin loading — disable the estree-dependent plugins'
date: 2026-07-11
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

TypeScript 7 is the Go-native compiler. Its npm package ships a `tsc` binary but **no JS compiler API**. `@typescript-eslint/typescript-estree`
imports the `typescript` package as a library at module load, and its peer range caps at `<6.1.0`. The `typescript-compat`, `vitest-compat`, and
testing-library plugins all pull in `@typescript-eslint/utils` → `typescript-estree`, so plugin loading crashes even though those compat rules are
purely syntactic and never use type information (type-aware rules come from `oxlint-tsgolint`, which drives the Go compiler directly).

## Solution

`oxlintConfig({ enableTypeScriptEstreePlugins: false })` drops the estree-dependent plugins and their rules until typescript-eslint supports
TypeScript 7. This repo dogfoods that in `vite.config.ts`; the README's "Using TypeScript 7" section documents it for consumers.

## What we tried first (and why it's gone)

- `overrides` in `pnpm-workspace.yaml` with a `pkg>typescript` selector — overrides do not rewrite peer-dependency resolution.
- `packageExtensions` adding `typescript` as a dependency — peer resolution still wins (`.pnpm` dir keeps the `_typescript@7.x` suffix).
- A `.pnpmfile.cjs` `readPackage` hook that rewrote the plugins' `typescript` peer into a private `typescript@6.0.3` dependency. This
  **worked** (all compat rules ran under TS7), but it is pnpm-only, invisible to other tooling, and every consumer would have to copy the
  hook. The explicit config option replaces it; losing the handful of typescript-compat/vitest-compat rules on TS7 projects is the accepted
  trade until typescript-eslint catches up.
