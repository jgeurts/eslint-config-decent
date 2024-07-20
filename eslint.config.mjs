import tsEslint from 'typescript-eslint';

import { defaultConfig } from './dist/index.mjs';

export default tsEslint.config(...defaultConfig());
