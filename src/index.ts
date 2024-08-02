import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tsEslint, { type ConfigWithExtends } from 'typescript-eslint';

import { configs as eslintConfigs } from './eslint.js';
import { configs as extensionConfigs } from './extension.js';
import { configs as importConfigs } from './import.js';
import { configs as jsdocConfigs } from './jsdoc.js';
import { configs as mochaConfigs } from './mocha.js';
import { configs as promiseConfigs } from './promise.js';
import { configs as reactConfigs } from './react.js';
import { configs as securityConfigs } from './security.js';
import { configs as typescriptEslintConfigs } from './typescriptEslint.js';
import { configs as unicornConfigs } from './unicorn.js';

export {
  eslintConfigs, //
  importConfigs,
  jsdocConfigs,
  promiseConfigs,
  reactConfigs,
  securityConfigs,
  typescriptEslintConfigs,
  unicornConfigs,
};

export interface DefaultConfigOptions {
  parserOptions?: NonNullable<ConfigWithExtends['languageOptions']>['parserOptions'];
  enableRequireExtensionRule?: boolean;
}

export function defaultConfig(options?: DefaultConfigOptions): ConfigWithExtends[] {
  const enableRequireExtensionRule = options?.enableRequireExtensionRule ?? true;
  const languageOptions: ConfigWithExtends['languageOptions'] = {
    globals: {
      ...globals.node,
    },
    parserOptions: {
      projectService: {
        defaultProject: 'tsconfig.json',
      },
      tsconfigRootDir: import.meta.dirname,
      ...options?.parserOptions,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [
    {
      ignores: ['**/dist/**', '**/node_modules/**'],
    },
    eslint.configs.recommended,
    {
      languageOptions: {
        ...tsEslint.configs.base.languageOptions,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [...tsEslint.configs.strictTypeChecked, ...tsEslint.configs.stylisticTypeChecked],
    },
    {
      languageOptions,
      settings: {
        ...jsdocConfigs.base.settings,
      },
    },
    {
      name: 'eslint-config-decent/base',
      files: ['**/*.ts', '**/*.js', '**/*.cjs', '**/*.mjs', '**/*.tsx'],
      plugins: {
        ...extensionConfigs.base.plugins,
        ...importConfigs.base.plugins,
        ...jsdocConfigs.base.plugins,
        ...promiseConfigs.base.plugins,
        ...securityConfigs.base.plugins,
        ...unicornConfigs.base.plugins,
      },
      rules: {
        ...eslintConfigs.base.rules,
        ...(enableRequireExtensionRule ? extensionConfigs.base.rules : {}),
        ...importConfigs.base.rules,
        ...jsdocConfigs.base.rules,
        ...promiseConfigs.base.rules,
        ...securityConfigs.base.rules,
        ...unicornConfigs.base.rules,
      },
    },
    {
      name: 'eslint-config-decent/ts',
      files: ['**/*.ts', '**/*.tsx'],
      ...typescriptEslintConfigs.base,
    },
    {
      name: 'eslint-config-decent/tsx',
      files: ['**/*.tsx'],
      ...reactConfigs.base,
    },
    {
      name: 'eslint-config-decent/cjs-and-esm',
      files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
      languageOptions: {
        sourceType: 'script',
      },
      ...eslintConfigs.cjsAndEsm,
    },
    {
      name: 'eslint-config-decent/cjs',
      files: ['**/*.js', '**/*.cjs'],
      languageOptions: {
        sourceType: 'script',
      },
      ...eslintConfigs.cjs,
    },
    {
      name: 'eslint-config-decent/tests',
      files: ['**/*.tests.ts', 'tests/tests.ts'],

      ...mochaConfigs.base,
    },
    {
      name: 'eslint-config-decent/cjs-and-esm-disable-ts-rules',
      files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
      extends: [tsEslint.configs.disableTypeChecked],
    },
    prettier,
  ];
}
