var a = {
    n: 1
}
var b = a;
console.log(a)
console.log(b)
console.log('------------------')

a.x = a = {
    n: 2
}
console.log(a.x)
console.log(b.x)
console.log('------------------')

console.log(a)
console.log(b)
// async await

async function time() {
    return ''
}
console.log(time()) //得到一个promise对象

function promiseValit(data) {
    return new Promise((resolve, reject) => {
        console.log('2秒后输出')
        setTimeout(() => {
            resolve(data + 1)
        }, 2000)
    })
}

async function test(m, n) {
    let num = Math.floor(Math.random() * (m - n + 1) + n)
    let _res = await promiseValit(num).then(res=>{
        console.log('result', res)
        return res
    }).catch(console.log)
    console.log('_res', _res)
}
test(8, 2)

// 暂时性死区
try {
    console.log(res)
    let res = ''
} catch (e) {
    // console.log(e)
}

// let 不能重复定义
let bas = '22'
// let bas = 44444
console.log(bas)

let pro = new Promise((resolve,reject)=>{
    try {
        console.log(res)
        let res = ''
        resolve('res')
    } catch (e) {
        reject('e')
        // console.log(e)
    }
})
pro.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})