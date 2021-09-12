/*eslint-env node*/
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:import/recommended',
  ],

  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],

  rules: {
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': 'error',
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'arrow-body-style': ['error', 'as-needed'],
    'quotes': ['error', 'single'],
    'key-spacing': ['error'],
    'space-infix-ops': 'error',
    'semi': ['warn', 'never'],
    'linebreak-style': ['off'],
    'space-before-function-paren': ['error', 'never'],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'no-multi-spaces': ['error', {
      ignoreEOLComments: false,
    }],
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
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-unused-vars': 'off',
    'no-undef': 'warn',
    indent: 'off',
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': ['off'],
    'import/newline-after-import': ['error', { 'count': 1 }],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },

  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',

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
      },
    },
  ],

  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.vue',
          '.js',
          '.ts',
        ],
      },
    },
  },
}
