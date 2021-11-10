/*
 * @Author: your name
 * @Date: 2021-11-08 10:55:33
 * @LastEditTime: 2021-11-10 20:13:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
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
function getHint() {
    console.log(this.hint, 'getHint')
}
let getHintIndex = getHint.bind({
    hint: '111111'
})
getHintIndex()

Function.prototype.myBind = function (content, ...args) {
     content = content || window
    const self = this

    return function(...target){
        self.apply(self, [...args,...target])
    }
}
let getHintIndex1 = getHint.myBind({
    hint: '333333'
})
getHintIndex1()

















console.log('--------------------------------------------')
global.btn = 'xxxxxxx'
// console.log(global,'global') // js 当前的全局不是window 而是global