module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  plugins: ['@typescript-eslint', 'react'],
  // settings: {
  //   react: {
  //     pragma: 'React',
  //     version: 'detect',
  //   },
  // },
  // // 配置解析器支持的语法
  // parserOptions: {
  //   ecmaVersion: 2019,
  //   sourceType: 'module',
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  // },
  rules: {
    '@typescript-eslint/ban-types': [0],
    '@typescript-eslint/explicit-module-boundary-types': [0],
    'react/display-name': [0],
    'prettier/prettier': [0],
    '@typescript-eslint/no-non-null-assertion': [0],
    '@typescript-eslint/no-misused-new': [0]
  },
}
