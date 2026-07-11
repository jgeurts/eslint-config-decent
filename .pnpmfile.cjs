'use strict';

// The ESLint-ecosystem plugins loaded by oxlint's JS-plugin runtime require the
// JS-API typescript (<6.1) at module load. The repo's own typescript is 7 (the
// Go-native compiler, which has no JS API), so resolve those packages' typescript
// peer to a private TypeScript 6 instance instead of the root install. They are
// only used for syntactic rules, so the version skew is harmless.
const JS_API_TYPESCRIPT_VERSION = '6.0.3';

function needsJsApiTypescript(pkg) {
  if (!pkg.peerDependencies?.typescript) {
    return false;
  }

  return (
    pkg.name.startsWith('@typescript-eslint/') ||
    pkg.name.startsWith('@stylistic/') ||
    pkg.name.startsWith('eslint-plugin-') ||
    pkg.name === '@vitest/eslint-plugin' ||
    pkg.name === 'oxlint-plugin-eslint'
  );
}

function readPackage(pkg) {
  if (needsJsApiTypescript(pkg)) {
    delete pkg.peerDependencies.typescript;
    if (pkg.peerDependenciesMeta) {
      delete pkg.peerDependenciesMeta.typescript;
    }

    pkg.dependencies = { ...pkg.dependencies, typescript: JS_API_TYPESCRIPT_VERSION };
  }

  return pkg;
}

module.exports = { hooks: { readPackage } };
