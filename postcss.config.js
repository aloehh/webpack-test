module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ['last 2 versions', '>1%']
    })
  ]
}
/**
 * postcss主要功能：
 * 1. 把css解析成js可以操作的AST
 * 2. 调用插件处理AST 并得到结果
 * 
 * 一般通过插件处理css，比如：
 * 自动补齐前缀： autoprefixer，
 * css压缩 cssnano
 * 
 * 相当于babel 于 js
 */