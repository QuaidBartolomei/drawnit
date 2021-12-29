module.exports = {
  // sort package.json if changed
  '**/package.json': 'sort-package-json',

  // format all file types recognized by prettier
  '*': 'prettier --ignore-unknown --write',

  // lint typescript files and run related unit tests
  'client/**/*.{ts,tsx}': [
    'npm run lint-staged:client --',
    'npm run test:client -- --findRelatedTests',
  ],
  'server/**/*.ts': [
    'npm run lint-staged:server --',
    'npm run test:server -- --findRelatedTests',
  ],

  // lint entire project if eslint settings changed
  'client/**/.eslint*': () => 'npm run lint:client',
  'server/**/.eslint*': () => 'npm run lint:server',
}
