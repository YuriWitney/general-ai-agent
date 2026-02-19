const path = require('path')

module.exports = {
  root: true,
  extends: ['standard-with-typescript'],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname
  },
  env: {
    node: true,
    es2022: true
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
