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
    es2020: true,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:compat/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/no-default-export': 'error',
    //IMPORT SORTING
    // disable standart rules to enable simple-sort-plugins rules
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
    // TYPESCRIPT
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreNumericLiteralTypes: true,
        ignoreEnums: true,
        enforceConst: true,
        ignoreReadonlyClassProperties: true,
        ignore: [-1, 0, 1, 2],
      },
    ],
    // SONAR
    'sonarjs/cognitive-complexity': 'warn',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  ignorePatterns: ['.eslintrc.js'],
};
