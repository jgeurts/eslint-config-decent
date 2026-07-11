import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/oxlint.ts'],
  format: ['esm', 'cjs'],
  dts: { sourcemap: true },
  sourcemap: true,
  clean: true,
  // Match the exports map: ./dist/index.mjs, ./dist/index.cjs, ./dist/index.d.ts, ./dist/index.d.cts
  outExtensions: ({ format }) => (format === 'cjs' ? { js: '.cjs', dts: '.d.cts' } : { js: '.mjs', dts: '.d.ts' }),
});
