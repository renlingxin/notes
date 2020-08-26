// vue 源码 拦截数组操作原理
let arrayProto = Array.prototype

let arrayProtos = Object.create(arrayProto)

// console.log(arrayProto,arrayProtos)

const myMethods = [
    'push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'
].forEach(item => {
    const oldMethods = arrayProto[item]
    def(arrayProtos, item, function (...arg) {
        const res = oldMethods.apply(this, arg)
        console.log('我拦截了原生的方法')
        return res
    })
})


let arr = ['1']

function putArray(arr, arrayProtos) {

    if (false) {
        console.log(arr)
        arr.__proto__ = arrayProtos
    } else {
        let arrayKeys = Object.getOwnPropertyNames(arrayProtos)
        for (let i = 0; i < arrayKeys.length; ++i) {
            let key = arrayKeys[i];
            def(arr, key, arrayProtos[key])
        }
    }
}


// 设置响应属性
function def(target, key, value) {
    Object.defineProperty(target, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    })
}
putArray(arr, arrayProtos)


arr.push(32)

console.log(arr)