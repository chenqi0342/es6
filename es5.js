"use strict";

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

//装饰器可以修饰类 类的属性 类的原型上的方法
//修饰的时候 就是把这个类 属性传递给修饰的函数
// @flag //函数，参数就是这个类 类不会预解释，不能加;一体的
var Animal = (_class = /*#__PURE__*/function () {
  function Animal() {
    _classCallCheck(this, Animal);

    this.PI = 3.14;
    this.name = 'xxx';
  }

  _createClass(Animal, [{
    key: "say",
    value: //实例上的属性
    function say(a, b, c) {
      //原型上的属性
      console.log('说话', a, b, c, this);
    }
  }]);

  return Animal;
}(), (_applyDecoratedDescriptor(_class.prototype, "say", [before], Object.getOwnPropertyDescriptor(_class.prototype, "say"), _class.prototype)), _class);
var animal = new Animal(); //给类拓展静态属性
// function flag (constructor) {
//     constructor.type= "232323"
// }
// console.log(Animal.type)
//实例上的属性
// function readonly(target, prototype, descriptor) {
// 	// console.log(arguments)
// 	//'0': {}, 构造函数的原型
// 	//'1': 'PI', //目标
// 	//'2': { //配置
// 	//  configurable: true,
// 	//  enumerable: true,
// 	//  writable: true,
// 	//  initializer: [Function: initializer]
// 	//}
// // 	//不可被重写
// // 	// descriptor.writable = false
// // 	// setTimeout(() => { console.log(target == Animal.prototype) }) //保证类执行完 类的原型
// // 	// console.log(target == Animal.prototype)
// }

function before(target, prototype, descriptor) {
  console.log(target); //Animal {}
  // console.log(arguments)
  //'0': {}, 构造函数的原型
  //'1': 'PI', //目标
  //'2': { //配置
  //  configurable: true,
  //  enumerable: false,
  //  writable: true,
  //  value: [Function: say]
  //}

  var oldSay = descriptor.value; //调用say方法先执行function,在函数上原有的方法，加上了我的方法

  descriptor.value = function () {
    console.log('before');
    oldSay.call.apply(oldSay, [target].concat(Array.prototype.slice.call(arguments))); //当前类的原型
  };
}

animal.say(1, 2, 3);
