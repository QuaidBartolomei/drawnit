module.exports = {
  // sort package.json if changed
  '**/package.json': 'sort-package-json',

  // format all file types recognized by prettier
  '*': 'prettier --ignore-unknown --write',

  // lint typescript files
  'client/**/*.{ts,tsx}': [
    'npm run lint-staged:client --',
    'npm run jest:client -- --findRelatedTests',
  ],
  'server/**/*.ts': [
    'npm run lint-staged:server --',
    'npm run jest:server -- --findRelatedTests',
  ],

  // lint entire project if eslint settings changed
  'client/**/.eslint*': 'npm run lint:client',
  'server/**/.eslint*': 'npm run lint:server',
}
