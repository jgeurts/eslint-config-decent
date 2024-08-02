# eslint-config-decent

[![NPM version](https://img.shields.io/npm/v/eslint-config-decent.svg?style=flat)](https://npmjs.org/package/eslint-config-decent)

A decent ESLint configuration for TypeScript projects.

## Example usage

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config();
```

## Override parserOptions

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config({
  projectService: {
    allowDefaultProject: ['./*.{js,cjs,mjs}'],
    defaultProject: 'tsconfig.json',
  },
  tsconfigRootDir: import.meta.dirname,
});
```

## Disable require-extensions rules

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config({
  enableRequireExtensions: false,
});
```

## Override a rule

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default [
  ...config(),
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
    },
  },
];
```

## Use typescript-eslint config

```mjs
// eslint.config.mjs

import { tsEslintConfig } from 'eslint-config-decent';
import tsEslint from 'typescript-eslint';

export default tsEslint(...tsEslintConfig());
```

## License

MIT
