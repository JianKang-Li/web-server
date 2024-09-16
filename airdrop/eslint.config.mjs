import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


export default [
  { files: ["**/*.{js,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  { "ignores": ['babel.config.js', 'eslint.config.mjs'] },
  {
    rules: {
      "vue/multi-word-component-names": 'off',
      "eol-last": 'error',//文件以单一的换行符结束
      "no-unused-vars": "error",
      "no-trailing-spaces": 'error',//一行结束后面不要有空格
      "eqeqeq": "error", // 三等号
      'no-multiple-empty-lines': 'error',
      'semi': ['error', 'never']
    }
  }
]
