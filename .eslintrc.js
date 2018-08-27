// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  
  plugins: ['vue'],

  globals: {
    document: false,
    navigator: false,
    window: false
  },

  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 'off',
    //nodejs 处理错误
    "handle-callback-err": 0,
    //"indent": [2, 4],
    "no-unused-vars": 0,
    "no-unreachable": 0,
    // switch语句最后必须有default
    "default-case": 0,
    "eqeqeq": 0,//必须使用全等
    "camelcase": 0,//强制驼峰法命名
    "no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
    "no-undef": 0,//不能有未定义的变量
    'vue/no-parsing-error': [2, {
      "x-invalid-end-tag": false
    }],
    "vue/no-reserved-keys": 0,
    //禁止在嵌套的块中出现变量声明或 function 声明
    "no-inner-declarations":0,
    "no-unused-expressions": 2,
    'standard/object-curly-even-spacing': [2, "either"],
    'standard/array-bracket-even-spacing': [2, "either"],
    'standard/computed-property-even-spacing': [2, "even"],
    'standard/no-callback-literal': [2, ["cb", "callback"]],
    'no-sequences': 0,
    // 禁止在计算属性中对属性修改
    // @off 太严格了
    'vue/no-side-effects-in-computed-properties': 0,
  }
}