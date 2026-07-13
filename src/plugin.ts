import { existsSync, lstatSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

// Minimal structural types for an oxlint JS plugin. Kept local (rather than
// importing from @oxlint/plugins) so the published .d.ts resolves without any
// extra packages; tests assert assignability against the real @oxlint/plugins
// types.
interface RuleContext {
  filename: string;
  report(diagnostic: { node: { range: [number, number] }; messageId: string; fix?: (fixer: RuleFixer) => { range: [number, number]; text: string } }): void;
}

interface RuleFixer {
  replaceText(nodeOrToken: { range: [number, number] }, text: string): { range: [number, number]; text: string };
}

interface SourceLiteral {
  type: string;
  value: unknown;
  range: [number, number];
}

// Deliberately loose so the visitor accepts every AST node type; the source
// property is narrowed at runtime.
interface ModuleDeclarationNode {
  source?: unknown;
}

function asStringSourceLiteral(source: unknown): (SourceLiteral & { value: string }) | undefined {
  if (typeof source !== 'object' || source === null) {
    return undefined;
  }

  const candidate = source as Partial<SourceLiteral>;
  if (candidate.type !== 'Literal' || typeof candidate.value !== 'string' || !Array.isArray(candidate.range)) {
    return undefined;
  }

  return candidate as SourceLiteral & { value: string };
}

export interface DecentRule {
  meta: {
    type: 'suggestion';
    docs: { description: string; url: string };
    fixable: 'code';
    schema: [];
    messages: Record<string, string>;
  };
  create(context: RuleContext): Record<string, (node: ModuleDeclarationNode) => void>;
}

export interface DecentPlugin {
  meta: { name: string };
  rules: Record<string, DecentRule>;
}

function makeSourceChecker(context: RuleContext, check: (importPath: string, resolvedPath: string) => { messageId: string; fixedPath: string } | undefined) {
  return (node: ModuleDeclarationNode): void => {
    const source = asStringSourceLiteral(node.source);
    if (!source) {
      return;
    }

    const importPath = source.value;
    if (!importPath.startsWith('.')) {
      return;
    }

    const resolvedPath = resolve(dirname(context.filename), importPath);
    const result = check(importPath, resolvedPath);
    if (result) {
      context.report({
        node: source,
        messageId: result.messageId,
        fix: (fixer) => fixer.replaceText(source, `'${result.fixedPath}'`),
      });
    }
  };
}

export const requireExtensionRule: DecentRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure import and export statements include a file extension',
      url: 'https://github.com/jgeurts/oxlint-config-decent/tree/main/src/plugin.ts',
    },
    fixable: 'code',
    schema: [],
    messages: {
      requireExtension: 'Relative imports and exports must include a file extension.',
    },
  },
  create(context) {
    const checkSource = makeSourceChecker(context, (importPath, resolvedPath) => {
      if (importPath.endsWith('.js')) {
        return undefined;
      }

      // If the path resolves to nothing on disk, it is missing its extension.
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      if (!existsSync(resolvedPath)) {
        return { messageId: 'requireExtension', fixedPath: `${importPath}.js` };
      }

      return undefined;
    });

    return {
      ImportDeclaration: checkSource,
      ExportNamedDeclaration: checkSource,
      ExportAllDeclaration: checkSource,
    };
  },
};

export const requireIndexRule: DecentRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure directory import and export statements use index.js',
      url: 'https://github.com/jgeurts/oxlint-config-decent/tree/main/src/plugin.ts',
    },
    fixable: 'code',
    schema: [],
    messages: {
      requireIndex: 'Directory imports and exports must use index.js.',
    },
  },
  create(context) {
    const checkSource = makeSourceChecker(context, (importPath, resolvedPath) => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      if (existsSync(resolvedPath) && lstatSync(resolvedPath).isDirectory()) {
        return { messageId: 'requireIndex', fixedPath: importPath.replace(/\/?$/, '/index.js') };
      }

      return undefined;
    });

    return {
      ImportDeclaration: checkSource,
      ExportNamedDeclaration: checkSource,
      ExportAllDeclaration: checkSource,
    };
  },
};

const plugin: DecentPlugin = {
  meta: { name: 'decent' },
  rules: {
    'require-extension': requireExtensionRule,
    'require-index': requireIndexRule,
  },
};

export default plugin;
