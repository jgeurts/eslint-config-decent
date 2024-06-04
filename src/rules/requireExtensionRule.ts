import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import type { Rule } from 'eslint';

export const requireExtensionRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure import and export statements include a file extension',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },
  create(context: Rule.RuleContext) {
    function checkSource(source: Parameters<NonNullable<Rule.NodeListener['ImportDeclaration']>>[0]['source']): void {
      const importPath = source.value as string;

      if (!importPath || !importPath.startsWith('.') || importPath.endsWith('.js')) {
        return;
      }

      const resolvedPath = resolve(dirname(context.filename), importPath);

      // If the import/export path doesn't end with a file extension, report an error
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      if (!existsSync(resolvedPath)) {
        context.report({
          node: source,
          message: 'Relative imports and exports must include a file extension.',
          fix(fixer) {
            const fixedPath = `${importPath}.js`;
            return fixer.replaceText(source, `'${fixedPath}'`);
          },
        });
      }
    }

    return {
      ImportDeclaration(node: Parameters<NonNullable<Rule.NodeListener['ImportDeclaration']>>[0]): void {
        checkSource(node.source);
      },
      ExportNamedDeclaration(node: Parameters<NonNullable<Rule.NodeListener['ExportNamedDeclaration']>>[0]): void {
        if (node.source) {
          checkSource(node.source);
        }
      },
      ExportAllDeclaration(node: Parameters<NonNullable<Rule.NodeListener['ExportAllDeclaration']>>[0]): void {
        checkSource(node.source);
      },
    };
  },
};
