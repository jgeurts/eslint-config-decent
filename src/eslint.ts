import type { TSESLint } from '@typescript-eslint/utils';

const base: TSESLint.FlatConfig.Config = {
  rules: {
    'array-callback-return': ['error', { allowImplicit: true }],
    'block-scoped-var': 'error',
    'callback-return': 'off',
    'class-methods-use-this': 'off',
    'default-case': ['error', { commentPattern: '^no default$' }],
    'default-case-last': 'error',
    eqeqeq: ['error', 'smart'],
    'func-names': 'error',
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: false,
      },
    ],
    'global-require': 'error',
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'error',
    'id-length': [
      'error',
      {
        exceptions: ['_', '$', 'e', 'i', 'j', 'k', 'q', 't', 'x', 'y'],
      },
    ],
    'lines-around-directive': [
      'error',
      {
        before: 'always',
        after: 'always',
      },
    ],
    'handle-callback-err': ['error', '^.*err'],
    'max-classes-per-file': ['error', 1],
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
        avoidExplicitReturnArrows: true,
      },
    ],
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'always'],
    'no-await-in-loop': 'error',
    'no-bitwise': 'error',
    'no-buffer-constructor': 'error',
    'no-caller': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-console': 'error',
    'no-constructor-return': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-static-block': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-inner-declarations': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': ['error'],
    'no-multi-str': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-path-concat': 'error',
    'no-promise-executor-return': 'error',
    'no-proto': 'error',
    'no-restricted-exports': [
      'error',
      {
        restrictedNamedExports: [
          'default', // use `export default` to provide a default export
          'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
        ],
      },
    ],
    'no-restricted-globals': [
      'error',
      {
        name: 'isFinite',
        message: 'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
      },
      {
        name: 'isNaN',
        message: 'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
      },
    ],
    'no-restricted-properties': [
      'error',
      {
        object: 'arguments',
        property: 'callee',
        message: 'arguments.callee is deprecated',
      },
      {
        property: '__defineGetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        property: '__defineSetter__',
        message: 'Please use Object.defineProperty instead.',
      },
    ],
    'no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    'no-return-assign': ['error', 'always'],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-script-url': 'error',
    'no-template-curly-in-string': 'error',
    'no-undef-init': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable-loop': [
      'error',
      {
        ignore: [], // WhileStatement, DoWhileStatement, ForStatement, ForInStatement, ForOfStatement
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
      },
    ],
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['directive', 'block', 'block-like', 'multiline-block-like', 'cjs-export', 'cjs-import', 'class', 'export', 'import', 'if'],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: 'directive',
        next: 'directive',
      },
      {
        blankLine: 'any',
        prev: '*',
        next: ['if', 'for', 'cjs-import', 'import'],
      },
      {
        blankLine: 'any',
        prev: ['export', 'import'],
        next: ['export', 'import'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['try', 'function', 'switch'],
      },
      {
        blankLine: 'always',
        prev: 'if',
        next: 'if',
      },
      {
        blankLine: 'never',
        prev: ['return', 'throw'],
        next: '*',
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-exponentiation-operator': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-object-spread': 'error',
    'prefer-regex-literals': [
      'error',
      {
        disallowRedundantWrapping: true,
      },
    ],
    'prefer-template': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        allowSeparatedGroups: true,
      },
    ],
    'symbol-description': 'error',
    'unicode-bom': ['error', 'never'],
    'vars-on-top': 'error',
    yoda: 'error',
  },
};

const cjsAndEsm: TSESLint.FlatConfig.Config = {
  rules: {
    curly: ['error', 'multi-line'],
    'dot-notation': ['error', { allowKeywords: true }],
    'dot-location': ['error', 'property'],
    'getter-return': ['error', { allowImplicit: true }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],
    'no-array-constructor': 'error',
    'no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],
    'no-new-func': 'error',
    'no-new-symbol': 'error',
    'no-return-await': 'error',
    'no-shadow': 'error',
    'no-undef': 'error',
    'no-unexpected-multiline': 'error',
    'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],
  },
};

const cjs: TSESLint.FlatConfig.Config = {
  rules: {
    strict: ['error', 'global'],
  },
};

export const configs = {
  base,
  cjsAndEsm,
  cjs,
};

export default {
  configs,
};
