module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:import/recommended',
    './eslint/typescript.js',
  ],

  rules: {
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': 'error',
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'arrow-body-style': ['error', 'as-needed'],
    'quotes': ['error', 'single'],
    'key-spacing': ['error'],

    'vue/html-self-closing': 'warn',
    'vue/padding-line-between-blocks': 'error',

    'vue/max-attributes-per-line': ['warn', {
      singleline: 2,
    }],

    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase',
      {
        registeredComponentsOnly: false,
      },
    ],

    'semi': ['warn', 'never'],
    'linebreak-style': ['off'],
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': ['off'],

    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],

    'no-multi-spaces': ['error', {
      ignoreEOLComments: false,
    }],

    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    }],

    'comma-spacing': ['error', { before: false, after: true }],

    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],

    'no-trailing-spaces': ['error', {
      skipBlankLines: false,
      ignoreComments: false,
    }],

    'import/newline-after-import': ['error', { 'count': 1 }],

    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
