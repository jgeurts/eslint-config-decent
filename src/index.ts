import { type Config, type ConfigWithExtends } from '@eslint/config-helpers';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

import { configs as eslintConfigs } from './eslint.js';
import { configs as extensionConfigs } from './extension.js';
import { configs as importConfigs } from './import.js';
import { configs as jsdocConfigs } from './jsdoc.js';
import { configs as nextJsConfigs } from './nextjs.js';
import { configs as promiseConfigs } from './promise.js';
import { configs as reactConfigs } from './react.js';
import { configs as securityConfigs } from './security.js';
import { configs as stylisticConfigs } from './stylistic.js';
import { configs as testingLibraryConfigs } from './testingLibrary.js';
import { configs as typescriptEslintConfigs } from './typescriptEslint.js';
import { configs as unicornConfigs } from './unicorn.js';
import { configs as vitestConfigs } from './vitest.js';

export {
  eslintConfigs, //
  extensionConfigs,
  importConfigs,
  jsdocConfigs,
  promiseConfigs,
  reactConfigs,
  nextJsConfigs,
  securityConfigs,
  testingLibraryConfigs,
  typescriptEslintConfigs,
  unicornConfigs,
  vitestConfigs,
};

export interface DefaultConfigOptions {
  parserOptions?: NonNullable<ConfigWithExtends['languageOptions']>['parserOptions'];
  tsconfigRootDir?: string;
  enableRequireExtensionRule?: boolean;
  enableVitest?: boolean;
  enableReact?: boolean;
  enableNextJs?: boolean;
  nextJsRootDir?: string;
  enableTestingLibrary?: boolean;
}

/**
 * Exports the default configuration to be passed to `defineConfig` from eslint. Use this if you want more control of the configuration output.
 * @param {DefaultConfigOptions} options
 * @returns Array of typescript-eslint configurations
 * @deprecated Will be removed in the future
 */
export function tsEslintConfig(options?: DefaultConfigOptions): ConfigWithExtends[] {
  return decentConfig(options);
}

function decentConfig(options?: DefaultConfigOptions): ConfigWithExtends[] {
  const enableRequireExtensionRule = options?.enableRequireExtensionRule ?? true;
  const enableVitest = options?.enableVitest ?? true;
  const enableReact = options?.enableReact ?? true;
  const enableNextJs = options?.enableNextJs ?? false;
  const enableTestingLibrary = options?.enableTestingLibrary ?? true;
  const languageOptions: ConfigWithExtends['languageOptions'] = {
    globals: {
      ...globals.node,
    },
    parserOptions: {
      projectService: {
        defaultProject: 'tsconfig.json',
      },
      tsconfigRootDir: options?.tsconfigRootDir ?? import.meta.dirname,
      ...(options?.parserOptions as Record<string, unknown> | undefined),
    },
  };

  return [
    {
      ignores: ['**/dist/**', '**/node_modules/**'],
    },
    eslint.configs.recommended,
    {
      languageOptions: {
        ...(tsEslint.configs.base as Config).languageOptions,
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
    ...(enableReact
      ? ([
          {
            name: 'eslint-config-decent/tsx',
            files: ['**/*.tsx'],
            ...reactConfigs.base,
          },
          {
            name: 'eslint-config-decent/tsx-components',
            files: ['**/components/**/*.tsx'],
            rules: {
              'import/no-default-export': 'error',
              'unicorn/filename-case': [
                'error',
                {
                  case: 'pascalCase',
                },
              ],
            },
          },
          {
            name: 'eslint-config-decent/tsx-disable-ts-rules',
            files: ['**/*.tsx'],
            rules: {
              '@typescript-eslint/explicit-function-return-type': 'off',
            },
          },
        ] as Config[])
      : []),
    ...(enableNextJs
      ? [
          {
            name: 'eslint-config-decent/nextjs',
            files: ['**/*.tsx'],
            settings: {
              next: {
                rootDir: options?.nextJsRootDir,
              },
            },
            ...nextJsConfigs.base,
          },
        ]
      : []),
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
    ...(enableVitest
      ? [
          {
            name: 'eslint-config-decent/vitest-tests',
            files: ['**/__tests__/**/*.ts?(x)', '**/*.{spec,test}.ts?(x)'],

            ...vitestConfigs.base,
          },
        ]
      : []),
    ...(enableTestingLibrary
      ? ([
          {
            name: 'eslint-config-decent/testing-library',
            files: ['**/__tests__/**/*.ts?(x)', '**/*.{spec,test,tests}.ts?(x)'],

            ...testingLibraryConfigs.base,
          },
        ] as Config[])
      : []),
    ...(enableVitest || enableTestingLibrary
      ? ([
          {
            name: 'eslint-config-decent/tests-disable-ts-rules',
            files: ['**/__tests__/**/*.ts?(x)', '**/*.{spec,test,tests}.ts?(x)'],
            rules: {
              '@typescript-eslint/explicit-function-return-type': 'off',
              '@typescript-eslint/no-confusing-void-expression': 'off',
              '@typescript-eslint/no-non-null-assertion': 'off',
              '@typescript-eslint/no-unsafe-member-access': 'off',
            },
          },
        ] as Config[])
      : []),
    {
      ...stylisticConfigs.base,
      name: 'eslint-config-decent/stylistic',
      files: ['**/*.ts', '**/*.js', '**/*.cjs', '**/*.mjs', '**/*.tsx'],
    },
    {
      name: 'eslint-config-decent/cjs-and-esm-disable-ts-rules',
      files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
      extends: [tsEslint.configs.disableTypeChecked],
    },
    {
      ...prettier,
      rules: {
        ...prettier.rules,
        curly: ['error', 'all'],
        'prettier/prettier': 'error',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
      },
    },
  ];
}

/**
 * Exports eslint configurations. Use this if you do not need to explicitly import typescript-eslint in your project.
 * @param {object} options
 * @returns An array of eslint configurations
 */
export function config(options?: DefaultConfigOptions): Config[] {
  return defineConfig(...decentConfig(options));
}
