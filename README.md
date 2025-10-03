# eslint-config-decent

[![NPM version](https://img.shields.io/npm/v/eslint-config-decent.svg?style=flat)](https://npmjs.org/package/eslint-config-decent)

A decent ESLint configuration for TypeScript projects.

## Example usage

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config({
  tsconfigRootDir: import.meta.dirname,
});
```

## Override parserOptions

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config({
  parserOptions: {
    projectService: {
      defaultProject: 'tsconfig.json',
    },
    tsconfigRootDir: import.meta.dirname,
  },
});
```

## Disable require-extensions rules

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config({
  enableRequireExtensions: false,
  tsconfigRootDir: import.meta.dirname,
});
```

## Override a rule

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default [
  ...config({
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
    },
  },
];
```

## License

MIT
