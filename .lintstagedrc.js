module.exports = {
  // testing
  'client/**/*.{ts,tsx}': 'npm run client:test',
  'server/**/*.ts': 'npm run server:test',

  // sort package.json if changed
  '**/package.json': 'sort-package-json',

  // format all file types recognized by prettier
  '*': 'prettier --ignore-unknown --write',

  // lint typescript files
  'client/**/*.{ts,tsx}': [
    'npm run client:lint-selected --',
    'npm run client:unit -- --findRelatedTests',
  ],
  'server/**/*.ts': [
    'npm run server:lint-selected --',
    'npm run server:test -- --findRelatedTests',
  ],

  // lint entire project if eslint settings changed
  'client/**/.eslint*': 'npm run client:lint',
  'server/**/.eslint*': 'npm run server:lint',
}
