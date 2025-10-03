import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import type { Rule } from 'eslint';

export const requireExtensionRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure import and export statements include a file extension',
      url: 'https://github.com/jgeurts/eslint-config-decent/tree/main/src/rules/requireExtensionRule.ts',
    },
    fixable: 'code',
    schema: [],
    messages: {
      requireExtension: 'Relative imports and exports must include a file extension.',
    },
  },
  create(context: Rule.RuleContext) {
    function checkSource(source: Rule.Node | null | undefined): void {
      if (source?.type !== 'Literal' || typeof source.value !== 'string') {
        return;
      }

      const importPath = source.value;

      if (!importPath || !importPath.startsWith('.') || importPath.endsWith('.js')) {
        return;
      }

      const resolvedPath = resolve(dirname(context.filename), importPath);

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
      ImportDeclaration(node: Rule.Node): void {
        if (node.type === 'ImportDeclaration') {
          checkSource(node.source as Rule.Node);
        }
      },
      ExportNamedDeclaration(node: Rule.Node): void {
        if (node.type === 'ExportNamedDeclaration' && node.source) {
          checkSource(node.source as Rule.Node);
        }
      },
      ExportAllDeclaration(node: Rule.Node): void {
        if (node.type === 'ExportAllDeclaration') {
          checkSource(node.source as Rule.Node);
        }
      },
    };
  },
};
