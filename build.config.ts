import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  externals: [
    // eslint-disable-next-line security/detect-unsafe-regex
    /^eslint(\/.*)?$/,
    /^@eslint\/.*/,
    /^node_modules\/@eslint\/config-helpers.*$/,
    'json-schema',
  ],
});
