function _promise(exec) {
    let self = this
    self.value = ''
    self.reason = ''
    self.status = 'pending'

    function resolve(value) {
        // const run = () => {
            console.log(111111)
            if (self.status === 'pending') {
                self.value = value
                self.status = 'resolved'
            }
        // }
        // setTimeout(run, 0);
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected'
        }
    }
    try {
        exec(resolve, reject)
    } catch (error) {
        reject(error)
    }

}
_promise.prototype.then = function (success, fail) {
    let self = this
    return new _promise((resolve, reject) => {
        console.log(self)
        if (self.status === 'resolved' && self.value) {
            resolve(self.value)
            success(self.value)
        }
        if (self.status === 'rejected') {
            reject(self.reason)
            fail(self.reason)
        }
    })

}
_promise.prototype.catch = function (fails) {
    let self = this
    return self.then(undefined, fails)
}
_promise.all = function (_promiseArr) {
    return new _promise((resolve, reject) => {
        if (!Array.isArray(_promiseArr)) {
            return reject('promise.all 的 参数必须是 array')
        }
        let count = 0;
        let _len = _promiseArr.length;
        let value = new Array(_len);

        for (let i = 0; i < _len; i++) {
            _promiseArr[i].then(res => {
                count++
                value[i] = res
                // console.log('执行结果', res, count, _len)
                if (count === _len) {
                    return resolve(value);
                }
            }, err => {
                return reject(err);
            })

        }
    })
}
let p1 = new _promise((resolve, reject) => {
    // setTimeout(function () {
        resolve(555555)
    // }, 2000)
    // reject(11)
})

// let p2 = new _promise((resolve, reject) => {
//     // setTimeout(function () {
//     //     resolve(22)
//     // }, 2000)
//     resolve(22)
// })


// _promise.all  => all 实例

// _promise.all([p1, p2]).then(res => {
//     console.log(res)
// }, err => {
//     console.error(err)
// })

// _promise.then => then 实例

// p1.then(res => {
//     console.log('success', res)
// }, (err) => {
//     console.log('error', err)
// })

// _promise.then => 链式调用

// p1.then(res => {
//     console.log('success', res)
// }).then(res=>{
//     console.log('success2', res)
// })


// _promise.catch => catch

p1.then(res => {
    console.log('success =>', res)
})
// p1.catch(err=>{
//     console.log(err)
// })