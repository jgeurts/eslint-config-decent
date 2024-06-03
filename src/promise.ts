import promise from 'eslint-plugin-promise';
import type { ConfigWithExtends } from 'typescript-eslint';

const base: ConfigWithExtends = {
  plugins: {
    promise,
  },
  rules: {
    'promise/always-return': 'error',
    'promise/always-catch': 'off',
    'promise/catch-or-return': [
      'error',
      {
        allowThen: true,
      },
    ],
    'promise/no-native': 'off',
    'promise/param-names': 'error',
  },
};

export const configs = {
  base,
};

export default {
  configs,
};
