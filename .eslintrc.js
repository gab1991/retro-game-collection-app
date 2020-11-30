module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true, // Allows for the parsing of JSX
    },
    project: 'tsconfig.json',
  },

  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'jsx-a11y'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    //disable standart rules to enable simple-sort-plugins rules
    'sort-imports': 'off',
    'import/order': 'off',
    // simple-sort-pligins rules
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^redux', '^@?\\w'],
          ['vendors', '^\\u0000'],
          ['types', '^types'],
          ['exit', '../'],
          ['deeper', './'],
          ['styles', '.css'],
        ],
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
};
