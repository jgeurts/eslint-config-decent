# eslint-config-decent

[![NPM version](https://img.shields.io/npm/v/eslint-config-decent.svg?style=flat)](https://npmjs.org/package/eslint-config-decent)

A decent ESLint configuration for TypeScript projects.

## Example usage

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config({
  tsconfigRootDir: import.meta.dirname,
});
```

## Override parserOptions

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config({
  parserOptions: {
    projectService: {
      defaultProject: 'tsconfig.json',
    },
    tsconfigRootDir: import.meta.dirname,
  },
});
```

## Disable require-extensions rules

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default config({
  enableRequireExtensions: false,
  tsconfigRootDir: import.meta.dirname,
});
```

## Override a rule

```mjs
// eslint.config.mjs

import { config } from 'eslint-config-decent';

export default [
  ...config({
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
    },
  },
];
```

## Agent Skill for AI-Assisted Development

This package includes an Agent Skill that teaches AI coding assistants (Claude Code, OpenCode, etc.) to follow the same TypeScript standards enforced by the ESLint rules.

### Installation

```bash
npx skills add jgeurts/eslint-config-decent
```

Or copy manually:

```bash
mkdir -p .claude/skills
cp -r node_modules/eslint-config-decent/enforcing-typescript-standards .claude/skills/
```

> **Note**: The skill is copied to your project and won't update automatically. Re-run the install command after updating `eslint-config-decent` to get the latest skill instructions.

### Usage

Once installed, AI assistants will automatically apply the project's TypeScript standards when creating or modifying `.ts` and `.tsx` files. The skill instructs the AI to:

- Write code with explicit return types and member accessibility
- Organize imports correctly (order, extensions, type-only imports)
- Follow class member ordering conventions
- Avoid anti-patterns like useless comments, nested ternaries, and `await` in loops
- Run `npm run lint:code` to verify compliance before completing tasks

### Customizing the Skill

To override or extend the default instructions, edit the `SKILL.md` file in your project's skills directory:

## License

MIT
