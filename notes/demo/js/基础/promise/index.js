

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

async function getname() {
    let res = [{
        a: 2
    }, {
        a: 3
    }, {
        a: 4
    }]
    res.forEach(async item => {
        await setTimeout(() => {
            // console.log(item)
        }, 1000)
    })
}
getname()

function test() {
    let arr = [3, 2, 1]
    arr.forEach(async item => {
        const res = await fetch(item)
        console.log(res)
    })
    console.log('end')
}

function fetch(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x)
        }, 500 * x)
    })
}
test()
// for (let i = 0; i < Infinity; ++i) {
//     console.log('初极狭，才通人，复行数十步，豁然开朗')
// }