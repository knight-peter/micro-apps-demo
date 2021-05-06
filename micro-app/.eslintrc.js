module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // disallow use of console
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    // disallow use of debugger
    'no-debugger': 'error',
    // Disallow duplicate conditions in if-else-if chains
    'no-dupe-else-if': 'error',
    // disallow the use of alert, confirm, and prompt
    'no-alert': 'error',
    // disallow magic numbers
    // 'no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
    // disallow reassignment of function parameters
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['state', 'vm'],
    }],
    // disallow variable declarations from shadowing variables declared in the outer scope
    'no-shadow': ['error', { allow: ['state', 'error'] }],
    // specify the maximum length of a line in your program
    'max-len': ['error', 200, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    // disallow importing from the same path more than once
    'no-duplicate-imports': 'error',

    'import/prefer-default-export': 'off',

    'import/extensions': ['error', 'always', { js: 'never', vue: 'never' }],

    camelcase: 'off',

    'no-mixed-operators': 'off',
  },
};
