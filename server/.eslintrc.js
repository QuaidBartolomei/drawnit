module.exports = {
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],

  rules: {
    // project settings
    'import/extensions': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.{test,spec,dev}.ts', 'test/**/*'],
      },
    ],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'consistent-return': 'off',
    '@typescript-eslint/await-thenable': 'error',
    // need to fix
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/require-await': 'error',
    'no-console': 'off',

    // import sorting
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // node built in
          'external', // installed dependencies
          'internal', // baseUrl
          'index', // ./
          'sibling', // ./*
          'parent', // ../*
          'object', // ts only
          'type', // ts only
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
