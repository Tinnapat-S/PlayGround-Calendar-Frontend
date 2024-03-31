module.exports = {
  root: true,
  env: { browser: true, es2021: true }, // Change es2020 to es2021
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'off', // Move this rule to the rules section
    'prettier/prettier': 'error', // Ensure Prettier errors are reported
  },
}
