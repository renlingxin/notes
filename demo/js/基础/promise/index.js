let p1 = new Promise((resolve, reject) => {
    setTimeout(function () {
        reject(22)
    }, 5000)
    // resolve(22)
})

console.log(p1.__proto__)


p1.then(res => {
    console.log('success', res)
}).catch((err) => {
    console.log('error', err)
})


// 链式 调用的简单实现

// function getname(callback) {
//     callback(1)
//     let _name = {
//         catch: function () {
//             console.log(1111)
//         }
//     }
//     return _name
// }
// getname(res => {
//     console.log('res', res)
// }).catch()


function getsize(callback) {
    callback(a, b)

    function a(value) {
        console.log(value)
    }

    function b(b) {
        console.log(b)
    }
}
let g = new getsize((a, b) => {
    a('aaaaa')
    b('bbbbb')
})


class gettype {
    constructor(callback) {
        callback(this.a, this.b)
    }
    a(value) {
        console.log(value)
    }
    b(value) {
        console.log(value)
    }
}

let n = new gettype((a, b) => {
    setTimeout(() => {
        a('11111')
        b('22222')
    }, 2000)
})