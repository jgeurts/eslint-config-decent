import eslint from '@eslint/js';
import globals from 'globals';
import tsEslint, { type ConfigWithExtends } from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import { configs as eslintConfigs } from './eslint.js';
import { configs as extensionConfigs } from './extension.js';
import { configs as jsdocConfigs } from './jsdoc.js';
import { configs as mochaConfigs } from './mocha.js';
import { configs as promiseConfigs } from './promise.js';
import { configs as reactConfigs } from './react.js';
import { configs as securityConfigs } from './security.js';
import { configs as typescriptEslintConfigs } from './typescriptEslint.js';
import { configs as unicornConfigs } from './unicorn.js';

export {
  eslintConfigs, //
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
        allowDefaultProject: ['./*.{js,cjs,mjs}'],
        defaultProject: 'tsconfig.json',
      },
      tsconfigRootDir: import.meta.dirname,
      ...options?.parserOptions,
    },
  };

  return [
    {
      ignores: ['**/dist/**', '**/node_modules/**'],
    },
    eslint.configs.recommended,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    {
      languageOptions,
      settings: {
        ...jsdocConfigs.base.settings,
      },
    },
    {
      files: ['**/*.ts', '**/*.js', '**/*.cjs', '**/*.mjs', '**/*.tsx'],
      plugins: {
        ...extensionConfigs.base.plugins,
        ...jsdocConfigs.base.plugins,
        ...promiseConfigs.base.plugins,
        ...securityConfigs.base.plugins,
        ...unicornConfigs.base.plugins,
      },
      rules: {
        ...eslintConfigs.base.rules,
        ...(enableRequireExtensionRule ? extensionConfigs.base.rules : {}),
        ...jsdocConfigs.base.rules,
        ...promiseConfigs.base.rules,
        ...securityConfigs.base.rules,
        ...unicornConfigs.base.rules,
      },
    },
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
      languageOptions: {
        sourceType: 'script',
      },
      ...eslintConfigs.cjsAndEsm,
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      languageOptions: {
        sourceType: 'script',
      },
      ...eslintConfigs.cjs,
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      ...typescriptEslintConfigs.base,
    },
    {
      files: ['**/*.tsx'],
      ...reactConfigs.base,
    },
    {
      files: ['**/*.tests.ts', 'tests/tests.ts'],

      ...mochaConfigs.base,
    },
    prettier,
  ];
}
