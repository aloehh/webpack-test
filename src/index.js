import "./css/index.less";
import { init } from "./dragon";

function Person(n) {
  // 1. 创建一个对象， 将其引用指向this
  // let this = {}
  // 2. 给this指向的对象赋予构造属性
  this.name = n
  // 3. 如果没有手动返回对象， 则默认返回this指向的这个对象，也是隐性的
  // return this
}

Person.prototype.sayName = function () {
  // console.log(this.name);
};

/**
 * • 以构造器的prototype属性为原型，创建新对象；
 * • 将this(也就是上一句中的新对象)和调用参数传给构造器，执行；
 * • 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则舍弃掉第一步创建的新对象，返回手动return的对象。
 */

// const newP = new Person('ALOE')
// console.log(newP, newP.name);

// 自定义new函数

function newMethod(Person, ...rest) {
  let child = Object.create(Person.prototype)
  let result = Person.apply(child, rest)
  return typeof result === 'object' ? result : child
}

const newP = newMethod(Person, 'ali')
newP.sayName() 
// console.log(newP);

window.onload=function(){
  // init();
}