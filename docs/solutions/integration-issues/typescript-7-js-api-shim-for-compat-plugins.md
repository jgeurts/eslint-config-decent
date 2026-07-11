---
title: 'TypeScript 7 breaks @typescript-eslint plugin loading — shim a private TS6 via .pnpmfile.cjs'
date: 2026-07-11
category: integration-issues
---

## Symptom

With `typescript@7.x` as the installed TypeScript, running `oxlint` (or anything that loads the `-compat` JS plugins) fails while loading a plugin:

```text
Failed to load JS plugin: @vitest/eslint-plugin
  TypeError: Cannot read properties of undefined (reading 'Cjs')
    at .../@typescript-eslint/typescript-estree/dist/create-program/shared.js:59
```

## Why

TypeScript 7 is the Go-native compiler. Its npm package ships a `tsc` binary but **no JS compiler API**. `@typescript-eslint/typescript-estree`
imports the `typescript` package as a library at module load, and its peer range caps at `<6.1.0`. Every `-compat` plugin in this config pulls in
`@typescript-eslint/utils` → `typescript-estree`, so plugin loading crashes even though the compat rules are purely syntactic and never use type
information (type-aware rules come from `oxlint-tsgolint`, which drives the Go compiler directly).

## What does NOT work

- `overrides` in `pnpm-workspace.yaml` with a `pkg>typescript` selector — overrides do not rewrite peer-dependency resolution.
- `packageExtensions` adding `typescript` as a dependency — peer resolution still wins (`.pnpm` dir keeps the `_typescript@7.x` suffix).

## What works

A `.pnpmfile.cjs` `readPackage` hook that deletes the `typescript` peer from the eslint-ecosystem plugin packages and adds a private
`typescript@6.0.3` **dependency** instead. The repo root stays on TypeScript 7 for `tsc --noEmit` and tsdown's tsgo dts generation. See
[`.pnpmfile.cjs`](../../../.pnpmfile.cjs) in the repo root; the README's "Using TypeScript 7" section documents the same for consumers.

## Watch out

- Keep `.pnpmfile.cjs` in oxlint's `ignorePatterns` (see `oxlint.config.ts`): its `pkg` parameters are untyped, tripping the type-aware
  `no-unsafe-*` rules — and an `oxlint --fix` run once mis-merged its boolean chain, silently dropping the `@vitest/eslint-plugin` condition.
- The pinned `6.0.3` shim version will not be bumped by Renovate (it lives in the pnpmfile). That is fine: the TS6 line is frozen; it exists only
  to satisfy the JS API import.
