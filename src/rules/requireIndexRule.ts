import { existsSync, lstatSync } from 'fs';
import { resolve, dirname } from 'path';
import type { Rule } from 'eslint';

export const requireIndexRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure directory import and export statements use index.js',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },
  create(context: Rule.RuleContext) {
    function checkSource(source: Parameters<NonNullable<Rule.NodeListener['ImportDeclaration']>>[0]['source']): void {
      const importPath = source.value as string;

      // Resolve the path relative to the file being linted
      const resolvedPath = resolve(dirname(context.filename), importPath);

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const isDirectory = existsSync(resolvedPath) && lstatSync(resolvedPath).isDirectory();
      if (isDirectory) {
        context.report({
          node: source,
          message: 'Directory imports and exports must use index.js.',
          fix(fixer) {
            const fixedPath = importPath.replace(/\/?$/, '/index.js');
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
