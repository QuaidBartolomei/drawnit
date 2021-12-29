module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-unresolved': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/extensions': ['error', 'never'],
    '@typescript-eslint/require-await': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{ts,tsx}',
          '**/*.spec.{ts,tsx}',
          'test/**/*',
          '**/*.dev.ts',
          '**/test.ts',
        ],
      },
    ],
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-promise-executor-return': 'off',
    'consistent-return': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'default-case': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/no-unstable-nested-components': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: './tsconfig.json',
      },
    },
  },
}
