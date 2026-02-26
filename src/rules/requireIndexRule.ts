import { existsSync, lstatSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { type Rule } from 'eslint';

export const requireIndexRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure directory import and export statements use index.js',
      url: 'https://github.com/jgeurts/eslint-config-decent/tree/main/src/rules/requireIndexRule.ts',
    },
    fixable: 'code',
    schema: [],
    messages: {
      requireIndex: 'Directory imports and exports must use index.js.',
    },
  },
  create(context: Rule.RuleContext) {
    function checkSource(source: Rule.Node | null | undefined): void {
      if (source?.type !== 'Literal' || typeof source.value !== 'string') {
        return;
      }

      const importPath = source.value;

      // Resolve the path relative to the file being linted
      const resolvedPath = resolve(dirname(context.filename), importPath);

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const isDirectory = existsSync(resolvedPath) && lstatSync(resolvedPath).isDirectory();
      // If the import/export path doesn't end with a file extension, report an error
      if (isDirectory) {
        context.report({
          node: source,
          messageId: 'requireIndex',
          fix(fixer) {
            const fixedPath = importPath.replace(/\/?$/, '/index.js');
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
