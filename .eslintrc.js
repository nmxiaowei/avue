module.exports = {
  // 环境定义了预定义的全局变量。
  env: {
    //环境定义了预定义的全局变量。更多在官网查看
    browser: true,
    node: true,
    commonjs: true,
    amd: true,
    es6: true,
    mocha: true
  },
  globals: {
    expect: true,
    sinon: true
  },
  plugins: ['html', 'json'],
  extends: 'elemefe',
  rules: {
    'no-restricted-globals': ['error', 'event', 'fdescribe']
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  }
};
