// const loaderUtils = require("loader-utils");
/**
 * 
 * 1. loader就是一个声明式函数， 不能用箭头函数，
 * 2. 拿到源代码，做进一步的处理修饰，再返回处理后的源码
 * @returns 
 */

module.exports = function(source) {
  console.log('source', source);
  const result = source.replace('星期一', '星期日')
  return result
}