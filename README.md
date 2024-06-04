# eslint-config-decent

[![NPM version](https://img.shields.io/npm/v/eslint-config-decent.svg?style=flat)](https://npmjs.org/package/eslint-config-decent)

A decent ESLint configuration for TypeScript projects.

## Example usage

```mjs
// eslint.config.mjs

import { defaultConfig } from 'eslint-config-decent';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(...defaultConfig());
```

## Override parserOptions

````mjs
// eslint.config.mjs

import { defaultConfig } from 'eslint-config-decent';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(...defaultConfig({
      projectService: {
        allowedDefaultProject: ['./*.js', './*.cjs', './*.mjs', './tests/**/*.ts', './tests/**/*.js', './tests/**/*.cjs', './tests/**/*.mjs'],
        defaultProject: 'tsconfig.json',
      },
      tsconfigRootDir: import.meta.dirname,
}));

## Disable require-extensions rules

```mjs
// eslint.config.mjs

import { defaultConfig } from 'eslint-config-decent';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(...defaultConfig({
  enableRequireExtensions: false,
}));
````

## License

MIT
