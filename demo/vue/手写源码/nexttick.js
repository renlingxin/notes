const callbacks = []
let pedding = false


let miFun = null
let maFun = null

function callEnd() {
    pedding = false
    let _arr = callbacks.slice(0)
    for (let i = 0; i < _arr.length; ++i) {
        _arr[i]()
    }
}
// 处理宏任务队列
// Vue中对于 macro task 的实现，优先检测是否支持原生 setImmediate，这是一个高版本 IE 和 Edge 才支持的特性，
// 不支持的话再去检测是否支持原生的MessageChannel，如果也不支持的话就会降级为 setTimeout 0。
maFun = () => {
    setTimeout(callEnd, 0);
}

// 处理微任务队列
if (typeof Promise !== undefined) {
    let p = Promise.resolve()
    miFun = () => {
        p.then(callEnd)
    }
} else {
    miFun = maFun
}

function nextTick(cb, that) {
    let _resolve = null
    callbacks.push(() => {
        if(cb){
            cb.call(that)
        }
    })
    if (!pedding) {
        pedding = true
        miFun()
    }

    if (!cb && typeof Promise !== undefined) {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}
console.log(2222222)

// nextTick(() => {
//     console.log(11111111)
// })

console.log(nextTick())



console.log(333333)


setTimeout(() => {
    console.log(34444444)
}, 2)

let _fn =  function(){console.log('fsdfsdfsfsfsf')}
let _dia = setImmediate(_fn)