module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/prop-types': ['error', { skipUndeclared: true }],
    'react/jsx-props-no-spreading': ['off'],
  },
};
