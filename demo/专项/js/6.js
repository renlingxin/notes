// 同步异步promise


// 1. js 中的同步   1e8 => 100000000

function test() {
    console.time('1')
    for (let i = 0; i < 1e8; i++) {}
    console.timeEnd('1')
}

function test1() {
    console.log('0')
}
test()
test1()

// 2. async await  try catch 捕获
function Name() {
    return new Promise((resolve, reject) => {
        reject('1')
        // throw new Error('22222') //正常情况下这里会阻塞js代码的执行并且控制台抛出error 但是在promise中并没有???
        console.log('0000')
    })
}

async function getname() {
    try {
        const n = await Name()
    } catch (error) {
        // try catch 是可以正常捕获promise.reject
        console.log(error, 'getname --- error')
    }
}
getname()

// 3. try catch 捕获错误
function o() {
    try {
        // Promise.reject('2222') // 1. 捕获JS未处理的Promise错误 unhandledrejection
    } catch (error) {
        console.log(error, 'f --- error') //2. promise 作为异步任务并没有在try作用域中执行
    }
}
o()
async function f() {
    try {
        await Promise.reject('2222') // 异步任务 -> 同步任务
        await Promise.reject('3333').catch(console.log) //catch 捕获过的错误不会被try catch 捕获
    } catch (error) {
        console.log(error, 'f --- error')
    }
}
f()
// 4. JS未处理的Promise错误

// node 环境 process.on 实现对unhandledRejection的监听 window 环境可以 window.addEventListener
process.on('unhandledRejection', (reason, p) => {
    console.log('未处理的 rejection：', p, '原因：', reason);
});
Promise.reject('2222') // UnhandledPromiseRejectionWarning: 2222
Promise.reject('2222').catch(console.log)

// 5. 链式回调中的一些Tips

// 变量.then 
let p = new Promise((resolve, reject) => {
    resolve()
})
p.then(res => {
    console.log('p----1')
    Promise.resolve().then(res => {
        console.log('p----1-1')
    })
})

p.then(res => {
    console.log('p----2')
})
// 输出 -> 1 2 1-1

// promise.then 
let l = new Promise((resolve, reject) => {
    resolve()
}).then(res => {
    console.log('L----1')
    Promise.resolve().then(res => {
        console.log('L----1-1')
    })
})

l.then(res => {
    console.log('L----2')
    Promise.resolve().then(res => {
        console.log('L----2-1')
    }).then(res => {
        console.log('L----2-1-1')
    })
})
// 输出 -> 1 1-1 2 2-1 2-1-1

Promise.resolve('0').then(res => {
        console.log('Promise.resolve --- 1', res)
        Promise.resolve('3').then(res => {
            console.log('Promise.resolve --- 2', res)
            return 3
        }).then(res => { //这里的then 已经被排到了下一个执行栈里 因此 4 先于 3 
            console.log('Promise.resolve --- 3', res)
        })
        // return 2
    })
    .then(res => {
        console.log('Promise.resolve --- 4', res)
    })
// 整体输出 p----1
// p----2
// L----1
// Promise.resolve --- 1 0
// p----1-1
// L----1-1
// L----2
// Promise.resolve --- 2 2
// 总结 -> 每一个promise的第一个then 都会现行执行.之后逐级调用  new promise().then > l.then     l.then1 > l.then2 内部状态不依赖