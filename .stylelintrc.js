module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    indentation: 2,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'value-keyword-case': null,
  },
}