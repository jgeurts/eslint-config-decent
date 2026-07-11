import { defineConfig } from 'oxlint';

import { oxlintConfig } from './src/index.ts';

export default defineConfig({
  extends: [
    oxlintConfig({
      enableReact: false,
      enableNextJs: false,
      enableTestingLibrary: false,
    }),
  ],
  // Package-manager infra; its `pkg` params are untyped, tripping the unsafe-* rules.
  ignorePatterns: ['.pnpmfile.cjs'],
});
