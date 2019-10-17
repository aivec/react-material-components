module.exports = {
  extends: ['airbnb', 'prettier/react'],
  plugins: ['babel'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    semi: [2, 'never'],
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['webpack.*.js'] },
    ],
  },
  settings: {
    'import/resolver': { webpack: { extensions: ['.js', '.jsx'] } },
  },
}
