const fs = require('fs')

// console.log(fs)

function a() {
    b().then(res => {
        console.log('res', res)
    })
}

function b() {
    return new Promise((resolve, reject) => {
        resolve && resolve(1)
    })
}
a()


// async 函数返回的是 promise 
async function c() {
    let res = await d()
    console.log('res1', res)
    return res
}

function d() {
    try {
        // console.log(e)
        let e = 0
        return Promise.resolve(e)
    } catch (err) {
        return Promise.resolve(err)
    }
}
console.log('my value => ', c())


async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 550);