module.exports = {
  // sort package.json if changed
  '**/package.json': 'sort-package-json',

  // format all file types recognized by prettier
  '*': 'prettier --ignore-unknown --write',

  // lint typescript files
  'client/**/*.{ts,tsx}': 'npm run client:lint-staged --',
  'server/**/*.{ts,tsx}': 'npm run server:lint-staged --',

  // lint entire project if eslint settings changed
  'client/**/.eslint*': 'npm run client:lint',
  'server/**/.eslint*': 'npm run server:lint',
}
