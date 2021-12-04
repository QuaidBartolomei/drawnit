module.exports = {
  '**/package.json': 'npx sort-package-json',
  '*': 'prettier --ignore-unknown --write',
  'client/**/*.{ts,tsx}': 'npm run client:lint-staged --',
  'server/**/*.{ts,tsx}': 'npm run server:lint-staged --',
  'client/**/.eslint*': 'npm run client:lint',
  'server/**/.eslint*': 'npm run server:lint',
}
