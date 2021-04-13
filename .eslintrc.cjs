module.exports = {
  env: {
    es2020: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    // 'plugin:markdown/recommended',
    'plugin:node/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: false }
    ],
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['dynamicImport', 'modules']
      }
    ],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        semi: false,
        singleQuote: true,
        trailingComma: 'none'
      }
    ],
    'promise/always-return': 'off',
    'promise/catch-or-return': [
      'error',
      {
        allowThen: true
      }
    ]
  }
}
