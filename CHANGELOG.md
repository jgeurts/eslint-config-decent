# Change Log

## 2.0.0 - 2024-08-02

- Export `config()` so that projects do not need to wrap the output of this project with `tsEslint.config()`. This is now the preferred way to consume this config library.

## 1.6.0 - 2024-08-02

- Update npms (Specifically, support typescript-eslint 8.0.0)

## 1.5.0 - 2024-07-19

- Enable `sort-imports` and `import/order`

## 1.4.2 - 2024-07-19

- Update npms
- Use types from @typescript-eslint/utils

## 1.4.1 - 2024-07-10

- Update npms

## 1.4.0 - 2024-07-10

- Turn off `@typescript-eslint/no-confusing-void-expression` for tests

## 1.3.0 - 2024-07-09

- Turn off `class-methods-use-this`

## 1.2.9 - 2024-07-09

- Do not include js files in default project
- Update npms

## 1.2.8 - 2024-07-03

- Try constraining typescript rules to only ts and tsx files

## 1.2.7 - 2024-07-03

- Exclude js files from default project to avoid linting with typescript rules

## 1.2.6 - 2024-07-03

- Turn off @typescript-eslint/no-unsafe-call in js cleanup

## 1.2.5 - 2024-07-03

- Cleanup typescript rules for all js files

## 1.2.4 - 2024-07-03

- Cleanup typescript rules for mjs files

## 1.2.3 - 2024-07-03

- Provide config names

## 1.2.2 - 2024-07-01

- Update typescript eslint npm

## 1.2.1 - 2024-07-01

- Update npms

## 1.2.0 - 2024-06-03

- Add rules to enforce file extensions. Rules adapted from [eslint-plugin-require-extensions](https://github.com/solana-labs/eslint-plugin-require-extensions) to work with ESM.

## 1.1.0 - 2024-06-03

- Add react related rules

## 1.0.0 - 2024-06-03

- Initial release
