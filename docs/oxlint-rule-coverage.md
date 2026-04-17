# Oxlint Rule Coverage

Every active rule enforced by `eslint-config-decent` and its oxlint status.

**Status key:**

- ✅ Native — oxlint Rust engine
- 🔌 Compat — via `-compat` JS plugin alias
- 🔌 JS — via standalone JS plugin
- ❌ N/A — not available (reason noted)

**Totals:** ~393 enforced rules → 293 native, 46 compat, 36 JS plugin, 18 not available (**95% coverage**)

> Rules explicitly set to `off` are excluded. Recommended config spreads are resolved against `src/oxlint.ts`.

---

## ESLint Core — base (`src/eslint.ts`)

| Rule                          | Status                                 |
| ----------------------------- | -------------------------------------- |
| `array-callback-return`       | ✅ Native                              |
| `block-scoped-var`            | ✅ Native                              |
| `default-case`                | ✅ Native                              |
| `default-case-last`           | ✅ Native                              |
| `eqeqeq`                      | ✅ Native                              |
| `func-names`                  | ✅ Native                              |
| `func-style`                  | ✅ Native                              |
| `global-require`              | ✅ Native (as `node/global-require`)   |
| `grouped-accessor-pairs`      | ✅ Native                              |
| `guard-for-in`                | ✅ Native                              |
| `handle-callback-err`         | ❌ N/A (deprecated Node.js rule)       |
| `id-length`                   | ✅ Native                              |
| `lines-around-directive`      | ❌ N/A (deprecated, formatting)        |
| `max-classes-per-file`        | ✅ Native                              |
| `no-await-in-loop`            | ✅ Native                              |
| `no-bitwise`                  | ✅ Native                              |
| `no-buffer-constructor`       | ❌ N/A (deprecated Node.js rule)       |
| `no-caller`                   | ✅ Native                              |
| `no-cond-assign`              | ✅ Native                              |
| `no-console`                  | ✅ Native                              |
| `no-constructor-return`       | ✅ Native                              |
| `no-else-return`              | ✅ Native                              |
| `no-empty-static-block`       | ✅ Native                              |
| `no-eval`                     | ✅ Native                              |
| `no-extend-native`            | ✅ Native                              |
| `no-extra-bind`               | ✅ Native                              |
| `no-extra-label`              | ✅ Native                              |
| `no-inner-declarations`       | ✅ Native                              |
| `no-iterator`                 | ✅ Native                              |
| `no-label-var`                | ✅ Native                              |
| `no-labels`                   | ✅ Native                              |
| `no-lone-blocks`              | ✅ Native                              |
| `no-lonely-if`                | ✅ Native                              |
| `no-multi-assign`             | ✅ Native                              |
| `no-multi-str`                | ✅ Native                              |
| `no-negated-condition`        | ✅ Native                              |
| `no-nested-ternary`           | ✅ Native                              |
| `no-new-object`               | ❌ N/A (deprecated)                    |
| `no-new-require`              | ✅ Native (as `node/no-new-require`)   |
| `no-new-wrappers`             | ✅ Native                              |
| `no-octal-escape`             | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `no-path-concat`              | ✅ Native (as `node/no-path-concat`)   |
| `no-promise-executor-return`  | ✅ Native                              |
| `no-proto`                    | ✅ Native                              |
| `no-restricted-exports`       | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `no-restricted-globals`       | ✅ Native                              |
| `no-restricted-properties`    | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `no-restricted-syntax`        | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `no-return-assign`            | ✅ Native                              |
| `no-script-url`               | ✅ Native                              |
| `no-self-compare`             | ✅ Native                              |
| `no-sequences`                | ✅ Native                              |
| `no-template-curly-in-string` | ✅ Native                              |
| `no-undef-init`               | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `no-unneeded-ternary`         | ✅ Native                              |
| `no-unreachable-loop`         | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `no-unused-expressions`       | ✅ Native                              |
| `no-useless-computed-key`     | ✅ Native                              |
| `no-useless-concat`           | ✅ Native                              |
| `no-useless-rename`           | ✅ Native                              |
| `no-useless-return`           | ✅ Native                              |
| `object-shorthand`            | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `one-var`                     | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `operator-assignment`         | ✅ Native                              |
| `prefer-const`                | ✅ Native                              |
| `prefer-numeric-literals`     | ✅ Native                              |
| `prefer-object-spread`        | ✅ Native                              |
| `prefer-regex-literals`       | 🔌 Compat (via `oxlint-plugin-eslint`) |
| `prefer-template`             | ✅ Native                              |
| `sort-imports`                | ✅ Native                              |
| `symbol-description`          | ✅ Native                              |
| `unicode-bom`                 | ✅ Native                              |
| `vars-on-top`                 | ✅ Native                              |
| `yoda`                        | ✅ Native                              |

61 native, 9 compat, 4 N/A — **95%**

## ESLint Core — CJS/ESM (`src/eslint.ts`)

| Rule                           | Status                                                           |
| ------------------------------ | ---------------------------------------------------------------- |
| `curly`                        | ✅ Native                                                        |
| `dot-notation`                 | ❌ N/A (won't implement; use `typescript/dot-notation`)          |
| `getter-return`                | ✅ Native                                                        |
| `no-array-constructor`         | ✅ Native                                                        |
| `no-empty-function`            | ✅ Native                                                        |
| `no-new-func`                  | ✅ Native                                                        |
| `no-new-symbol`                | ❌ N/A (deprecated, use `no-new-native-nonconstructor`)          |
| `no-return-await`              | ❌ N/A (deprecated; covered by `typescript/return-await` for TS) |
| `no-shadow`                    | ✅ Native                                                        |
| `no-undef`                     | ✅ Native                                                        |
| `no-unexpected-multiline`      | ✅ Native                                                        |
| `no-use-before-define`         | ✅ Native                                                        |
| `no-useless-constructor`       | ✅ Native                                                        |
| `no-var`                       | ✅ Native                                                        |
| `prefer-arrow-callback`        | 🔌 Compat (via `oxlint-plugin-eslint`)                           |
| `prefer-promise-reject-errors` | ✅ Native                                                        |

12 native, 1 compat, 3 N/A — **81%**

## ESLint Core — CJS (`src/eslint.ts`)

| Rule     | Status                                     |
| -------- | ------------------------------------------ |
| `strict` | ❌ N/A (CJS module directive, ESLint-only) |

## TypeScript — explicit (`src/typescriptEslint.ts`)

| Rule                                                        | Status                                  |
| ----------------------------------------------------------- | --------------------------------------- |
| `@typescript-eslint/array-type`                             | ✅ Native                               |
| `@typescript-eslint/ban-ts-comment`                         | ✅ Native                               |
| `@typescript-eslint/consistent-type-imports`                | ✅ Native                               |
| `@typescript-eslint/default-param-last`                     | ✅ Native                               |
| `@typescript-eslint/explicit-function-return-type`          | ✅ Native                               |
| `@typescript-eslint/explicit-member-accessibility`          | 🔌 Compat (ships native in oxlint 1.61) |
| `@typescript-eslint/member-ordering`                        | 🔌 Compat                               |
| `@typescript-eslint/naming-convention`                      | 🔌 Compat                               |
| `@typescript-eslint/no-dupe-class-members`                  | ✅ Native                               |
| `@typescript-eslint/no-empty-interface`                     | ✅ Native                               |
| `@typescript-eslint/no-extra-semi`                          | ❌ N/A (deprecated)                     |
| `@typescript-eslint/no-loop-func`                           | ✅ Native                               |
| `@typescript-eslint/no-redeclare`                           | ✅ Native                               |
| `@typescript-eslint/no-shadow`                              | ✅ Native                               |
| `@typescript-eslint/no-unnecessary-boolean-literal-compare` | ✅ Native                               |
| `@typescript-eslint/only-throw-error`                       | ✅ Native                               |
| `@typescript-eslint/parameter-properties`                   | ✅ Native                               |
| `@typescript-eslint/restrict-template-expressions`          | ✅ Native                               |
| `@typescript-eslint/return-await`                           | ✅ Native                               |
| `@typescript-eslint/sort-type-constituents`                 | ❌ N/A (deprecated)                     |

15 native, 3 compat, 2 N/A — **90%**

## TypeScript — inherited from `strictTypeChecked` + `stylisticTypeChecked`

All 75 rules are ✅ Native in oxlint.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Full list (75 rules)</summary>
<!-- markdownlint-enable MD033 -->

| Rule                                                         | Status    |
| ------------------------------------------------------------ | --------- |
| `@typescript-eslint/await-thenable`                          | ✅ Native |
| `@typescript-eslint/ban-tslint-comment`                      | ✅ Native |
| `@typescript-eslint/class-literal-property-style`            | ✅ Native |
| `@typescript-eslint/consistent-generic-constructors`         | ✅ Native |
| `@typescript-eslint/consistent-indexed-object-style`         | ✅ Native |
| `@typescript-eslint/consistent-type-assertions`              | ✅ Native |
| `@typescript-eslint/consistent-type-definitions`             | ✅ Native |
| `@typescript-eslint/dot-notation`                            | ✅ Native |
| `@typescript-eslint/no-array-delete`                         | ✅ Native |
| `@typescript-eslint/no-base-to-string`                       | ✅ Native |
| `@typescript-eslint/no-confusing-non-null-assertion`         | ✅ Native |
| `@typescript-eslint/no-confusing-void-expression`            | ✅ Native |
| `@typescript-eslint/no-deprecated`                           | ✅ Native |
| `@typescript-eslint/no-duplicate-enum-values`                | ✅ Native |
| `@typescript-eslint/no-duplicate-type-constituents`          | ✅ Native |
| `@typescript-eslint/no-dynamic-delete`                       | ✅ Native |
| `@typescript-eslint/no-empty-object-type`                    | ✅ Native |
| `@typescript-eslint/no-explicit-any`                         | ✅ Native |
| `@typescript-eslint/no-extra-non-null-assertion`             | ✅ Native |
| `@typescript-eslint/no-extraneous-class`                     | ✅ Native |
| `@typescript-eslint/no-floating-promises`                    | ✅ Native |
| `@typescript-eslint/no-for-in-array`                         | ✅ Native |
| `@typescript-eslint/no-implied-eval`                         | ✅ Native |
| `@typescript-eslint/no-inferrable-types`                     | ✅ Native |
| `@typescript-eslint/no-invalid-void-type`                    | ✅ Native |
| `@typescript-eslint/no-meaningless-void-operator`            | ✅ Native |
| `@typescript-eslint/no-misused-new`                          | ✅ Native |
| `@typescript-eslint/no-misused-promises`                     | ✅ Native |
| `@typescript-eslint/no-mixed-enums`                          | ✅ Native |
| `@typescript-eslint/no-namespace`                            | ✅ Native |
| `@typescript-eslint/no-non-null-asserted-nullish-coalescing` | ✅ Native |
| `@typescript-eslint/no-non-null-asserted-optional-chain`     | ✅ Native |
| `@typescript-eslint/no-non-null-assertion`                   | ✅ Native |
| `@typescript-eslint/no-redundant-type-constituents`          | ✅ Native |
| `@typescript-eslint/no-require-imports`                      | ✅ Native |
| `@typescript-eslint/no-this-alias`                           | ✅ Native |
| `@typescript-eslint/no-unnecessary-condition`                | ✅ Native |
| `@typescript-eslint/no-unnecessary-template-expression`      | ✅ Native |
| `@typescript-eslint/no-unnecessary-type-arguments`           | ✅ Native |
| `@typescript-eslint/no-unnecessary-type-assertion`           | ✅ Native |
| `@typescript-eslint/no-unnecessary-type-constraint`          | ✅ Native |
| `@typescript-eslint/no-unnecessary-type-parameters`          | ✅ Native |
| `@typescript-eslint/no-unsafe-argument`                      | ✅ Native |
| `@typescript-eslint/no-unsafe-assignment`                    | ✅ Native |
| `@typescript-eslint/no-unsafe-call`                          | ✅ Native |
| `@typescript-eslint/no-unsafe-declaration-merging`           | ✅ Native |
| `@typescript-eslint/no-unsafe-enum-comparison`               | ✅ Native |
| `@typescript-eslint/no-unsafe-function-type`                 | ✅ Native |
| `@typescript-eslint/no-unsafe-member-access`                 | ✅ Native |
| `@typescript-eslint/no-unsafe-return`                        | ✅ Native |
| `@typescript-eslint/no-unsafe-unary-minus`                   | ✅ Native |
| `@typescript-eslint/no-useless-empty-export`                 | ✅ Native |
| `@typescript-eslint/no-wrapper-object-types`                 | ✅ Native |
| `@typescript-eslint/non-nullable-type-assertion-style`       | ✅ Native |
| `@typescript-eslint/prefer-as-const`                         | ✅ Native |
| `@typescript-eslint/prefer-find`                             | ✅ Native |
| `@typescript-eslint/prefer-for-of`                           | ✅ Native |
| `@typescript-eslint/prefer-function-type`                    | ✅ Native |
| `@typescript-eslint/prefer-includes`                         | ✅ Native |
| `@typescript-eslint/prefer-literal-enum-member`              | ✅ Native |
| `@typescript-eslint/prefer-namespace-keyword`                | ✅ Native |
| `@typescript-eslint/prefer-nullish-coalescing`               | ✅ Native |
| `@typescript-eslint/prefer-optional-chain`                   | ✅ Native |
| `@typescript-eslint/prefer-promise-reject-errors`            | ✅ Native |
| `@typescript-eslint/prefer-reduce-type-parameter`            | ✅ Native |
| `@typescript-eslint/prefer-regexp-exec`                      | ✅ Native |
| `@typescript-eslint/prefer-return-this-type`                 | ✅ Native |
| `@typescript-eslint/prefer-string-starts-ends-with`          | ✅ Native |
| `@typescript-eslint/prefer-ts-expect-error`                  | ✅ Native |
| `@typescript-eslint/require-await`                           | ✅ Native |
| `@typescript-eslint/restrict-plus-operands`                  | ✅ Native |
| `@typescript-eslint/switch-exhaustiveness-check`             | ✅ Native |
| `@typescript-eslint/triple-slash-reference`                  | ✅ Native |
| `@typescript-eslint/unbound-method`                          | ✅ Native |
| `@typescript-eslint/unified-signatures`                      | ✅ Native |

</details>

## Unicorn (`src/unicorn.ts`)

| Rule                                    | Status    |
| --------------------------------------- | --------- |
| `unicorn/better-regex`                  | 🔌 Compat |
| `unicorn/custom-error-definition`       | 🔌 Compat |
| `unicorn/no-array-method-this-argument` | ✅ Native |
| `unicorn/no-for-loop`                   | 🔌 Compat |
| `unicorn/prefer-array-find`             | ✅ Native |
| `unicorn/prefer-node-protocol`          | ✅ Native |
| `unicorn/prefer-object-from-entries`    | ✅ Native |
| `unicorn/prefer-set-has`                | ✅ Native |

5 native, 3 compat — **100%**

## Import (`src/import.ts`)

| Rule                                     | Status    |
| ---------------------------------------- | --------- |
| `import/consistent-type-specifier-style` | ✅ Native |
| `import/first`                           | ✅ Native |
| `import/newline-after-import`            | 🔌 Compat |
| `import/no-duplicates`                   | ✅ Native |
| `import/order`                           | 🔌 Compat |

3 native, 2 compat — **100%**

## Promise (`src/promise.ts`)

| Rule                      | Status    |
| ------------------------- | --------- |
| `promise/always-return`   | ✅ Native |
| `promise/catch-or-return` | ✅ Native |
| `promise/param-names`     | ✅ Native |

3 native — **100%**

## JSDoc (`src/jsdoc.ts`)

Spreads `jsdoc.configs['flat/recommended'].rules`, then applies explicit overrides.

| Rule                                            | Status    |
| ----------------------------------------------- | --------- |
| `jsdoc/check-access`                            | ✅ Native |
| `jsdoc/check-alignment`                         | 🔌 Compat |
| `jsdoc/check-indentation`                       | 🔌 Compat |
| `jsdoc/check-property-names`                    | ✅ Native |
| `jsdoc/check-tag-names`                         | ✅ Native |
| `jsdoc/check-types`                             | 🔌 Compat |
| `jsdoc/empty-tags`                              | ✅ Native |
| `jsdoc/implements-on-classes`                   | ✅ Native |
| `jsdoc/no-defaults`                             | ✅ Native |
| `jsdoc/require-hyphen-before-param-description` | 🔌 Compat |
| `jsdoc/require-param`                           | ✅ Native |
| `jsdoc/require-param-name`                      | ✅ Native |
| `jsdoc/require-param-type`                      | ✅ Native |
| `jsdoc/require-property`                        | ✅ Native |
| `jsdoc/require-property-description`            | ✅ Native |
| `jsdoc/require-property-name`                   | ✅ Native |
| `jsdoc/require-property-type`                   | ✅ Native |
| `jsdoc/require-returns`                         | ✅ Native |
| `jsdoc/require-returns-check`                   | 🔌 Compat |
| `jsdoc/require-yields`                          | ✅ Native |
| `jsdoc/require-yields-check`                    | 🔌 Compat |
| `jsdoc/tag-lines`                               | 🔌 Compat |
| `jsdoc/valid-types`                             | 🔌 Compat |

15 native, 8 compat — **100%**

## Security (`src/security.ts`)

No native oxlint equivalents. All rules run via standalone `eslint-plugin-security` JS plugin.

| Rule                                             | Status |
| ------------------------------------------------ | ------ |
| `security/detect-buffer-noassert`                | 🔌 JS  |
| `security/detect-child-process`                  | 🔌 JS  |
| `security/detect-disable-mustache-escape`        | 🔌 JS  |
| `security/detect-eval-with-expression`           | 🔌 JS  |
| `security/detect-new-buffer`                     | 🔌 JS  |
| `security/detect-no-csrf-before-method-override` | 🔌 JS  |
| `security/detect-non-literal-fs-filename`        | 🔌 JS  |
| `security/detect-non-literal-regexp`             | 🔌 JS  |
| `security/detect-non-literal-require`            | 🔌 JS  |
| `security/detect-possible-timing-attacks`        | 🔌 JS  |
| `security/detect-pseudoRandomBytes`              | 🔌 JS  |
| `security/detect-unsafe-regex`                   | 🔌 JS  |

12 JS plugin — **100%**

## React (`src/react.ts`)

Spreads `react.configs.recommended.rules` + `react.configs['jsx-runtime'].rules`, then applies explicit overrides.

| Rule                                         | Status                                          |
| -------------------------------------------- | ----------------------------------------------- |
| `react/default-props-match-prop-types`       | 🔌 Compat                                       |
| `react/display-name`                         | ✅ Native                                       |
| `react/forbid-foreign-prop-types`            | 🔌 Compat                                       |
| `react/iframe-missing-sandbox`               | ✅ Native                                       |
| `react/jsx-closing-bracket-location`         | ❌ N/A (formatting, Prettier handles)           |
| `react/jsx-fragments`                        | ✅ Native                                       |
| `react/jsx-key`                              | ✅ Native                                       |
| `react/jsx-no-comment-textnodes`             | ✅ Native                                       |
| `react/jsx-no-duplicate-props`               | ✅ Native                                       |
| `react/jsx-no-leaked-render`                 | 🔌 Compat                                       |
| `react/jsx-no-script-url`                    | ✅ Native                                       |
| `react/jsx-no-target-blank`                  | ✅ Native                                       |
| `react/jsx-no-undef`                         | ✅ Native                                       |
| `react/jsx-no-useless-fragment`              | ✅ Native                                       |
| `react/jsx-pascal-case`                      | ✅ Native                                       |
| `react/jsx-props-no-multi-spaces`            | ❌ N/A (formatting, Prettier handles)           |
| `react/no-access-state-in-setstate`          | 🔌 Compat                                       |
| `react/no-arrow-function-lifecycle`          | 🔌 Compat                                       |
| `react/no-children-prop`                     | ✅ Native                                       |
| `react/no-danger-with-children`              | ✅ Native                                       |
| `react/no-deprecated`                        | 🔌 Compat                                       |
| `react/no-did-mount-set-state`               | ✅ Native                                       |
| `react/no-did-update-set-state`              | 🔌 Compat                                       |
| `react/no-direct-mutation-state`             | ✅ Native                                       |
| `react/no-find-dom-node`                     | ✅ Native                                       |
| `react/no-invalid-html-attribute`            | 🔌 Compat                                       |
| `react/no-is-mounted`                        | ❌ N/A (from recommended; deprecated React API) |
| `react/no-namespace`                         | ✅ Native                                       |
| `react/no-redundant-should-component-update` | ✅ Native                                       |
| `react/no-render-return-value`               | ✅ Native                                       |
| `react/no-string-refs`                       | ✅ Native                                       |
| `react/no-this-in-sfc`                       | ✅ Native                                       |
| `react/no-typos`                             | 🔌 Compat                                       |
| `react/no-unescaped-entities`                | ✅ Native                                       |
| `react/no-unknown-property`                  | ✅ Native                                       |
| `react/no-unsafe`                            | ✅ Native                                       |
| `react/no-unstable-nested-components`        | 🔌 Compat                                       |
| `react/no-unused-class-component-methods`    | 🔌 Compat                                       |
| `react/no-unused-prop-types`                 | 🔌 Compat                                       |
| `react/no-unused-state`                      | 🔌 Compat                                       |
| `react/no-will-update-set-state`             | ✅ Native                                       |
| `react/prefer-stateless-function`            | 🔌 Compat                                       |
| `react/prop-types`                           | ❌ N/A (from recommended; TypeScript handles)   |
| `react/require-render-return`                | ✅ Native                                       |
| `react/self-closing-comp`                    | ✅ Native                                       |
| `react/style-prop-object`                    | ✅ Native                                       |

28 native, 14 compat, 4 N/A — **91%**

## React Hooks (`src/react.ts`)

Spreads `reactHooks.configs.flat['recommended-latest'].rules`, then overrides both rules to `error`.

| Rule                          | Status                                 |
| ----------------------------- | -------------------------------------- |
| `react-hooks/rules-of-hooks`  | ✅ Native (as `react/rules-of-hooks`)  |
| `react-hooks/exhaustive-deps` | ✅ Native (as `react/exhaustive-deps`) |

2 native — **100%**

## JSX-A11Y (`src/react.ts`)

Spreads `a11y.configs.recommended.rules`, then applies explicit overrides.

| Rule                                                     | Status                   |
| -------------------------------------------------------- | ------------------------ |
| `jsx-a11y/alt-text`                                      | ✅ Native                |
| `jsx-a11y/anchor-has-content`                            | ✅ Native                |
| `jsx-a11y/anchor-is-valid`                               | ✅ Native                |
| `jsx-a11y/aria-activedescendant-has-tabindex`            | ✅ Native                |
| `jsx-a11y/aria-props`                                    | ✅ Native                |
| `jsx-a11y/aria-proptypes`                                | ✅ Native                |
| `jsx-a11y/aria-role`                                     | ✅ Native                |
| `jsx-a11y/aria-unsupported-elements`                     | ✅ Native                |
| `jsx-a11y/autocomplete-valid`                            | ✅ Native                |
| `jsx-a11y/click-events-have-key-events`                  | ✅ Native                |
| `jsx-a11y/heading-has-content`                           | ✅ Native                |
| `jsx-a11y/html-has-lang`                                 | ✅ Native                |
| `jsx-a11y/iframe-has-title`                              | ✅ Native                |
| `jsx-a11y/img-redundant-alt`                             | ✅ Native                |
| `jsx-a11y/interactive-supports-focus`                    | ❌ N/A (not implemented) |
| `jsx-a11y/label-has-associated-control`                  | ✅ Native                |
| `jsx-a11y/lang`                                          | ✅ Native                |
| `jsx-a11y/media-has-caption`                             | ✅ Native                |
| `jsx-a11y/mouse-events-have-key-events`                  | ✅ Native                |
| `jsx-a11y/no-access-key`                                 | ✅ Native                |
| `jsx-a11y/no-aria-hidden-on-focusable`                   | ✅ Native                |
| `jsx-a11y/no-autofocus`                                  | ✅ Native                |
| `jsx-a11y/no-distracting-elements`                       | ✅ Native                |
| `jsx-a11y/no-interactive-element-to-noninteractive-role` | ❌ N/A (not implemented) |
| `jsx-a11y/no-noninteractive-element-interactions`        | ❌ N/A (not implemented) |
| `jsx-a11y/no-noninteractive-element-to-interactive-role` | ❌ N/A (not implemented) |
| `jsx-a11y/no-noninteractive-tabindex`                    | ✅ Native                |
| `jsx-a11y/no-redundant-roles`                            | ✅ Native                |
| `jsx-a11y/no-static-element-interactions`                | ✅ Native                |
| `jsx-a11y/role-has-required-aria-props`                  | ✅ Native                |
| `jsx-a11y/role-supports-aria-props`                      | ✅ Native                |
| `jsx-a11y/scope`                                         | ✅ Native                |
| `jsx-a11y/tabindex-no-positive`                          | ✅ Native                |

29 native, 4 N/A — **88%**

## Next.js (`src/nextjs.ts`)

All recommended rules set to `error`.

| Rule                                                       | Status    |
| ---------------------------------------------------------- | --------- |
| `@next/next/google-font-display`                           | ✅ Native |
| `@next/next/google-font-preconnect`                        | ✅ Native |
| `@next/next/inline-script-id`                              | ✅ Native |
| `@next/next/next-script-for-ga`                            | ✅ Native |
| `@next/next/no-assign-module-variable`                     | ✅ Native |
| `@next/next/no-async-client-component`                     | ✅ Native |
| `@next/next/no-before-interactive-script-outside-document` | ✅ Native |
| `@next/next/no-css-tags`                                   | ✅ Native |
| `@next/next/no-document-import-in-page`                    | ✅ Native |
| `@next/next/no-duplicate-head`                             | ✅ Native |
| `@next/next/no-head-element`                               | ✅ Native |
| `@next/next/no-head-import-in-document`                    | ✅ Native |
| `@next/next/no-html-link-for-pages`                        | ✅ Native |
| `@next/next/no-img-element`                                | ✅ Native |
| `@next/next/no-page-custom-font`                           | ✅ Native |
| `@next/next/no-script-component-in-head`                   | ✅ Native |
| `@next/next/no-styled-jsx-in-document`                     | ✅ Native |
| `@next/next/no-sync-scripts`                               | ✅ Native |
| `@next/next/no-title-in-document-head`                     | ✅ Native |
| `@next/next/no-typos`                                      | ✅ Native |
| `@next/next/no-unwanted-polyfillio`                        | ✅ Native |

21 native — **100%**

## Vitest (`src/vitest.ts`)

Spreads `vitest.configs.recommended.rules`, then applies explicit overrides. Scoped to test file globs.

| Rule                                      | Status    |
| ----------------------------------------- | --------- |
| `vitest/consistent-test-it`               | ✅ Native |
| `vitest/expect-expect`                    | ✅ Native |
| `vitest/no-commented-out-tests`           | ✅ Native |
| `vitest/no-conditional-tests`             | ✅ Native |
| `vitest/no-disabled-tests`                | ✅ Native |
| `vitest/no-duplicate-hooks`               | ✅ Native |
| `vitest/no-focused-tests`                 | ✅ Native |
| `vitest/no-identical-title`               | ✅ Native |
| `vitest/no-import-node-test`              | ✅ Native |
| `vitest/no-standalone-expect`             | ✅ Native |
| `vitest/no-test-prefixes`                 | ✅ Native |
| `vitest/padding-around-after-all-blocks`  | 🔌 Compat |
| `vitest/padding-around-after-each-blocks` | 🔌 Compat |
| `vitest/padding-around-describe-blocks`   | 🔌 Compat |
| `vitest/prefer-comparison-matcher`        | ✅ Native |
| `vitest/prefer-equality-matcher`          | ✅ Native |
| `vitest/prefer-hooks-in-order`            | ✅ Native |
| `vitest/prefer-hooks-on-top`              | ✅ Native |
| `vitest/prefer-lowercase-title`           | ✅ Native |
| `vitest/prefer-mock-promise-shorthand`    | ✅ Native |
| `vitest/prefer-snapshot-hint`             | 🔌 Compat |
| `vitest/prefer-spy-on`                    | ✅ Native |
| `vitest/prefer-strict-equal`              | ✅ Native |
| `vitest/prefer-vi-mocked`                 | 🔌 Compat |
| `vitest/require-to-throw-message`         | ✅ Native |
| `vitest/require-top-level-describe`       | ✅ Native |
| `vitest/valid-describe-callback`          | ✅ Native |
| `vitest/valid-expect`                     | ✅ Native |
| `vitest/valid-title`                      | ✅ Native |

24 native, 5 compat — **100%**

## Testing Library (`src/testingLibrary.ts`)

No native oxlint equivalents. All rules run via standalone `eslint-plugin-testing-library` JS plugin. Scoped to test file globs.

Spreads `testingLibrary.configs['flat/react'].rules`, then applies explicit overrides.

| Rule                                              | Status |
| ------------------------------------------------- | ------ |
| `testing-library/await-async-events`              | 🔌 JS  |
| `testing-library/await-async-queries`             | 🔌 JS  |
| `testing-library/await-async-utils`               | 🔌 JS  |
| `testing-library/no-await-sync-events`            | 🔌 JS  |
| `testing-library/no-await-sync-queries`           | 🔌 JS  |
| `testing-library/no-container`                    | 🔌 JS  |
| `testing-library/no-debugging-utils`              | 🔌 JS  |
| `testing-library/no-dom-import`                   | 🔌 JS  |
| `testing-library/no-global-regexp-flag-in-query`  | 🔌 JS  |
| `testing-library/no-manual-cleanup`               | 🔌 JS  |
| `testing-library/no-node-access`                  | 🔌 JS  |
| `testing-library/no-promise-in-fire-event`        | 🔌 JS  |
| `testing-library/no-render-in-lifecycle`          | 🔌 JS  |
| `testing-library/no-unnecessary-act`              | 🔌 JS  |
| `testing-library/no-wait-for-multiple-assertions` | 🔌 JS  |
| `testing-library/no-wait-for-side-effects`        | 🔌 JS  |
| `testing-library/no-wait-for-snapshot`            | 🔌 JS  |
| `testing-library/prefer-explicit-assert`          | 🔌 JS  |
| `testing-library/prefer-find-by`                  | 🔌 JS  |
| `testing-library/prefer-implicit-assert`          | 🔌 JS  |
| `testing-library/prefer-presence-queries`         | 🔌 JS  |
| `testing-library/prefer-query-by-disappearance`   | 🔌 JS  |
| `testing-library/prefer-screen-queries`           | 🔌 JS  |
| `testing-library/render-result-naming-convention` | 🔌 JS  |

24 JS plugin — **100%**

---

## Stylistic (`src/stylistic.ts`)

Most stylistic rules are pure formatting handled by oxfmt (or Prettier).
The one structural rule that no formatter handles is `padding-line-between-statements`,
which enforces blank lines between statement types.

| Rule                                         | Status                    |
| -------------------------------------------- | ------------------------- |
| `@stylistic/padding-line-between-statements` | 🔌 Compat                 |
| All other `@stylistic/*` rules               | Handled by oxfmt/Prettier |

1 compat — the rest are formatter-handled

## Excluded modules

- **Extension** (`src/extension.ts`) — Custom `decent-extension` rules. ESLint-only, no oxlint equivalent.
