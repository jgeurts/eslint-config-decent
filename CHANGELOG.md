## [2.6.5](https://github.com/jgeurts/eslint-config-decent/compare/v2.6.4...v2.6.5) (2025-04-07)

### Bug Fixes

- **deps:** update all dependencies ([#6](https://github.com/jgeurts/eslint-config-decent/issues/6)) ([8d445d0](https://github.com/jgeurts/eslint-config-decent/commit/8d445d0fcbc15b772e9096cd6921cf0de2e88e02))
- **deps:** update all dependencies to v8.29.1 ([#7](https://github.com/jgeurts/eslint-config-decent/issues/7)) ([01687a2](https://github.com/jgeurts/eslint-config-decent/commit/01687a29b2a4be2362cbc5cb98161add45569f33))

## [2.6.4](https://github.com/jgeurts/eslint-config-decent/compare/v2.6.3...v2.6.4) (2025-04-06)

### Bug Fixes

- **deps:** update all dependencies ([#2](https://github.com/jgeurts/eslint-config-decent/issues/2)) ([880ff65](https://github.com/jgeurts/eslint-config-decent/commit/880ff65fd1b76de02c8d3df0951af967eed88dc9))
- Ignore markdown formatting issues for changelog ([b09ae66](https://github.com/jgeurts/eslint-config-decent/commit/b09ae66391714caab18ffae5d0fc5a05aa818611))
- Permissions for semantic pr action ([1a340b4](https://github.com/jgeurts/eslint-config-decent/commit/1a340b40cc187ff3ff5b1b31b912de1177790958))
- Set correct npm token variable name ([42c1c85](https://github.com/jgeurts/eslint-config-decent/commit/42c1c855a3aaacc70ea0e442acb0b04f0e998019))

# 2.6.3 - 2024-03-30

- Update npms
- Enforce ts-expect-error description format

# 2.6.2 - 2024-03-18

- Update npms

# 2.6.1 - 2024-03-10

- Update npms

# 2.6.0 - 2024-02-21

- Add stylistic rules
- Fix jsdoc rules
- Update npms

# 2.5.0 - 2024-02-10

- Add Next.js rules
- Update npms

# 2.4.3 - 2024-02-08

- Update npms
- Disable callback-return. ESLint has deprecated that rule

# 2.4.2 - 2024-02-06

- Update npms
- Disable @typescript-eslint/explicit-function-return-type for tsx files

# 2.4.1 - 2024-01-23

- Update npms

# 2.4.0 - 2024-01-20

- Update npms
- Enable JSX automatic runtime

# 2.3.1 - 2024-01-08

- Update npms

# 2.3.0 - 2024-12-17

- Update npms
- Enable unicorn/prefer-node-protocol

# 2.2.3 - 2024-11-29

- Update npms

# 2.2.2 - 2024-09-30

- Update npms

# 2.2.1 - 2024-09-10

- Update npms

# 2.2.0 - 2024-08-26

- Update npms
- Support specifying only tsconfigRootDir and updated example usage accordingly.

# 2.1.0 - 2024-08-13

- Add rules for jest, jest-dom, and testing-library
- Add options to disable jest, mocha, react, and testing library rules
- Update npms

# 2.0.4 - 2024-08-03

- Fix react-hooks rule compatibility with eslint 9
- Add setting to auto-detect react version for react-hooks plugin
- Include JSX runtime language options

# 2.0.3 - 2024-08-02

- Add exception for `t` for `id-length`, to account for i18next helper function.

# 2.0.2 - 2024-08-02

- Fix testing-library rule compatibility with eslint 9

# 2.0.1 - 2024-08-02

- Add documentation for `tsEslint()`
- Deprecate `defaultConfig`

# 2.0.0 - 2024-08-02

- Export `config()` so that projects do not need to wrap the output of this project with `tsEslint.config()`. This is now the preferred way to consume this config library.

# 1.6.0 - 2024-08-02

- Update npms (Specifically, support typescript-eslint 8.0.0)

# 1.5.0 - 2024-07-19

- Enable `sort-imports` and `import/order`

# 1.4.2 - 2024-07-19

- Update npms
- Use types from @typescript-eslint/utils

# 1.4.1 - 2024-07-10

- Update npms

# 1.4.0 - 2024-07-10

- Turn off `@typescript-eslint/no-confusing-void-expression` for tests

# 1.3.0 - 2024-07-09

- Turn off `class-methods-use-this`

# 1.2.9 - 2024-07-09

- Do not include js files in default project
- Update npms

# 1.2.8 - 2024-07-03

- Try constraining typescript rules to only ts and tsx files

# 1.2.7 - 2024-07-03

- Exclude js files from default project to avoid linting with typescript rules

# 1.2.6 - 2024-07-03

- Turn off @typescript-eslint/no-unsafe-call in js cleanup

# 1.2.5 - 2024-07-03

- Cleanup typescript rules for all js files

# 1.2.4 - 2024-07-03

- Cleanup typescript rules for mjs files

# 1.2.3 - 2024-07-03

- Provide config names

# 1.2.2 - 2024-07-01

- Update typescript eslint npm

# 1.2.1 - 2024-07-01

- Update npms

# 1.2.0 - 2024-06-03

- Add rules to enforce file extensions. Rules adapted from [eslint-plugin-require-extensions](https://github.com/solana-labs/eslint-plugin-require-extensions) to work with ESM.

# 1.1.0 - 2024-06-03

- Add react related rules

# 1.0.0 - 2024-06-03

- Initial release
