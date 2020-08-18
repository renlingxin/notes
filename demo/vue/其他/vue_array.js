// vue 源码 拦截数组操作原理
let arrayProto = Array.prototype

let arrayProtos = Object.create(arrayProto)

// console.log(arrayProto,arrayProtos)

const myMethods = [
    'push', 'pop', 'shift', 'unshift','reverse','sort','splice'
].forEach(item => {
    const oldMethods = arrayProto[item]
    Object.defineProperty(arrayProtos, item, {
        value: function (...arg) {
            const res = oldMethods.apply(this, arg)
            console.log('我拦截了原生的方法')
            return res
        }
    })
})


let arr = ['1']
arr.__proto__ = arrayProtos

arr.push(32)

console.log(arr)