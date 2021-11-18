/*
 * @Author: your name
 * @Date: 2021-11-08 10:55:33
 * @LastEditTime: 2021-11-16 17:20:34
 * @LastEditors: Please set LastEditors
 * @Description: 手写API
 * @FilePath: /github/demo/专项/js/1.js
 */

// 1. call 使用方式  Function.call(作用域, 参数)

function getAge(value) {
    console.log(this.age, value) // 34 45
}
getAge.call({
    age: 34
}, 45)

Function.prototype.myCall = function (content, ...args) {
    console.log(args, ...args, 'args') // 形参数组
    content = content || window // 传入可能为null
    content.$fn = this // this 是调用call的函数本身
    let res = content.$fn(...args)
    content.$fn = null
    return res
}

console.log('--------------------------------------------')

getAge.myCall({
    age: 43
}, 54, 55)

console.log('--------------------------------------------')

// 2. allpy 和 call 功能一致 区别是参数传递可以是以 形参为准的数组
function getName(pru1, pru2, pru3) {
    console.log(this.name, pru1, pru2, pru3) // 5 2 3
}
getName.apply({
    name: 'renlingxin'
}, [5, 2, 3])

Function.prototype.myApply = function (content, target) {
    content = content || window
    content.$fn = this
    let res = content.$fn(...target)
    content.$fn = null
    return res
}
getName.myApply({
    name: 'renlingxin'
}, [5, 2, 5])

console.log('--------------------------------------------')

// 3. bind 绑定this 与call apply 的区别在于不会执行
function getHint(arg1, arg2) {
    console.log('getHint----arguments', arg1, arg2)
    console.log(this.hint, 'Hint')
}
// let getHintIndex = getHint.bind({
//     hint: '111111'
// })
// getHintIndex()

Function.prototype.myBind = function (content, ...args) {
    content = content || window
    const self = this
    console.log('self', this)
    const Foo = function () {}

    const $fn = function (...target) {
        console.log(this instanceof Foo, this, '--------$fn------')
        // 如果当前函数的作用域在window 比如
        return self.apply(this instanceof Foo ? this : content, [...args, ...target])
    }
    // 通过原型挂载的方式 实现this的指向
    Foo.prototype = this.prototype
    $fn.prototype = new Foo()
    return $fn
}

let getHintIndex1 = getHint.myBind({
    hint: '333333'
}, 'target')

getHintIndex1('target222222')

console.log('--------------------------------------------')

let newIndex = new getHintIndex1(9)

console.log('--------------------------------------------')

// bind 示例 2 new bind返回的函数  this 指向不会正确 但仍然会是bind 指向的实例
// 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true ，可以让实例获得来自绑定函数的值，即上例中实例会具有 habit 属性。
// 当作为普通函数时，this 指向 window ，此时结果为 false ，将绑定函数的 this 指向 context
let value = 2;
let foo = {
    value: 1
};

function gar(name, age) {
    this.type = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
gar.prototype.friend = 'kevin';

let bindFoo = gar.bind(foo, 'Jack');
let obj = new bindFoo(20);
// undefined
// Jack
// 20

console.log(obj.type);
// shopping
console.log(obj.friend);
// kevin

console.log('--------------------------------------------')

const garIndex = gar.myBind(foo, 'marry')
let nGar = new garIndex(90)

console.log(nGar.type)
console.log(nGar.friend)

// new 

function goBack() {
    this.route = []
}
goBack.prototype.go = function (value) {
    if (!value) return
    return this.route[value]
}
goBack.prototype.push = function (value) {
    this.route.push(value)
}

const $router = new goBack()
$router.push(1)
console.log($router.route, '$router')

function myNew(tarFun, ...args) {
    const proto = Object.create({})
    proto.__proto__ = tarFun.prototype
    const res = tarFun.call(proto, ...args)
    return typeof res === 'object' ? res : proto
}

const $route1 = myNew(goBack)
$route1.push(2)
console.log($route1.__proto__,$route1.route, '$router1')












console.log('--------------------------------------------')
global.btn = 'xxxxxxx'
// console.log(global,'global') // js 当前的全局不是window 而是global

