import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

type Options = [];
type MessageIds = 'requireExtension';

export const requireExtensionRule = ESLintUtils.RuleCreator(() => 'https://github.com/jgeurts/eslint-config-decent/tree/main/src/rules/requireExtensionRule.ts')<Options, MessageIds>({
  name: 'require-extension',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure import and export statements include a file extension',
    },
    fixable: 'code',
    schema: [],
    messages: {
      requireExtension: 'Relative imports and exports must include a file extension.',
    },
  },
  defaultOptions: [],
  create(context) {
    function checkSource(source: TSESTree.StringLiteral): void {
      const importPath = source.value;

      if (!importPath || !importPath.startsWith('.') || importPath.endsWith('.js')) {
        return;
      }

      const resolvedPath = resolve(dirname(context.getFilename()), importPath);

      // If the import/export path doesn't end with a file extension, report an error
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      if (!existsSync(resolvedPath)) {
        context.report({
          node: source,
          messageId: 'requireExtension',
          fix(fixer) {
            const fixedPath = `${importPath}.js`;
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
