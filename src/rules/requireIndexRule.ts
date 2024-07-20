import { existsSync, lstatSync } from 'fs';
import { resolve, dirname } from 'path';
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

type Options = [];
type MessageIds = 'requireExtension';

export const requireIndexRule = ESLintUtils.RuleCreator(() => 'https://github.com/jgeurts/eslint-config-decent/tree/main/src/rules/requireIndexRule.ts')<Options, MessageIds>({
  name: 'require-index',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure directory import and export statements use index.js',
    },
    fixable: 'code',
    schema: [],
    messages: {
      requireExtension: 'Directory imports and exports must use index.js.',
    },
  },
  defaultOptions: [],
  create(context) {
    function checkSource(source: TSESTree.StringLiteral): void {
      const importPath = source.value;

      // Resolve the path relative to the file being linted
      const resolvedPath = resolve(dirname(context.filename), importPath);

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const isDirectory = existsSync(resolvedPath) && lstatSync(resolvedPath).isDirectory();
      // If the import/export path doesn't end with a file extension, report an error
      if (isDirectory) {
        context.report({
          node: source,
          messageId: 'requireExtension',
          fix(fixer) {
            const fixedPath = importPath.replace(/\/?$/, '/index.js');
            return fixer.replaceText(source, `'${fixedPath}'`);
          },
        });
      }
    }

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration): void {
        checkSource(node.source);
      },
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration): void {
        if (node.source) {
          checkSource(node.source);
        }
      },
      ExportAllDeclaration(node: TSESTree.ExportAllDeclaration): void {
        checkSource(node.source);
      },
    };
  },
});
