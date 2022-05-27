//装饰器可以修饰类 类的属性 类的原型上的方法
//修饰的时候 就是把这个类 属性传递给修饰的函数
// @flag //函数，参数就是这个类 类不会预解释，不能加;一体的
class Animal {
	// @readonly
	PI = 3.14
    name = 'xxx' //实例上的属性
    @before
	say(a,b,c) {//原型上的属性
		console.log('说话',a,b,c,this) //说话 1 2 3 {}
	}
}
let animal = new Animal()
//给类拓展静态属性
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
function before (target, prototype, descriptor) {
    console.log(target) //Animal {}
	// console.log(arguments)
	//'0': {}, 构造函数的原型
	//'1': 'PI', //目标
	//'2': { //配置
	//  configurable: true,
	//  enumerable: false,
	//  writable: true,
	//  value: [Function: say]
	//}
    let oldSay = descriptor.value
    //调用say方法先执行function,在函数上原有的方法，加上了我的方法
    descriptor.value = function () {
        console.log('before')
        oldSay.call(target,...arguments)//当前类的原型
    }
}
animal.say(1,2,3)