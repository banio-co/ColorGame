module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows parsing of JSX
    },
    ecmaVersion: 12, // Latest ECMA version at time of file creation
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect version of React to use
    },
  },
  extends: [
    // Recommended rules from @eslint-plugin-react
    'plugin:react/recommended',
    // Recommended ruleset for @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  plugins: [
    'import',
    'react',
    'react-native',
  ],
  rules: {
    // Override recommended rules + add additional ESLint rules
    // const example = require('example');
    '@typescript-eslint/no-var-requires': 'off',
    'react/prop-types': 0,
    'new-cap': 0,
    'max-len': [ 'error', {
      'code': 120,
      'tabWidth': 2,
      'ignoreComments': true,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
    }],
    'object-curly-spacing': [ 2, 'always' ],
    'array-bracket-spacing': [ 2, 'always', {
      'objectsInArrays': false,
    }],
    'quote-props': [ 2, 'as-needed', {
      'unnecessary': false,
    }],
    'import/order': [
      'error',
      {
        'groups': [ 'builtin', 'external', 'internal' ],
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'external',
            'position': 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': [ 'react' ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [ 'warn', { args: 'none' }],
    'require-jsdoc': 'off',
    'indent': 'off',
    '@typescript-eslint/indent': [ 'error', 2 ],
  },
};
