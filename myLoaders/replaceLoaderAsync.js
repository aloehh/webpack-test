const loaderUtils = require("loader-utils");
/**
 * 
 * 1. loader就是一个声明式函数， 不能用箭头函数，
 * 2. 拿到源代码，做进一步的处理修饰，再返回处理后的源码
 */

module.exports = function(source) {
  console.log('source', source);
  const options = loaderUtils.getOptions(this)
  const callback = this.async()
    const result = source.replace('hello', options.name)
  setTimeout(() => {
    callback(null, result)
  }, 2000)
  // return result
}