// 判断变量否为function
const isFunction = variable => typeof variable === 'function'

function _promise(exec) {
    let self = this
    self.value = ''
    self.reason = ''
    self.status = 'pending'
    self._successResult = []
    self._errorResult = []

    function resolve(value) {
        if (self.status !== 'pending') return
        const run = () => {
            self.value = value
            self.status = 'resolved'
            let cb;
            // 从数组初始未知开始 依次执行成功队列中的函数，并清空队列
            while (cb = self._successResult.shift()) {
                cb(value)
            }
        }
         // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0);
    }

    function reject(reason) {
        if (self.status !== 'pending') return
        self.reason = reason
        self.status = 'rejected'
        let cb;
        while (cb = self._errorResult.shift()) {
            cb(value)
        }
        setTimeout(run, 0);
    }
    try {
        exec(resolve, reject)
    } catch (error) {
        reject(error)
    }

}
_promise.prototype.then = function (success, fail) {
    let self = this
    console.log(self)
    return new _promise((resolve, reject) => {
        // 成功时执行的函数
        let fulfilled = value => {
            try {
                if (!isFunction(success)) {
                    resolve(value)
                } else {
                    success(value)
                    // 处理 then 中的链式调用
                    // let res = success(value);
                    // console.log('res',res)
                    // if (res instanceof _promise) {
                    //      // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                    //     res.then(resolve, reject)
                    // } else {
                    //     resolve(res)
                    // }
                }
            } catch (err) {
                // 出现错误 返回的promise 对象状态为失败
                reject(err)
            }
        }
        // 失败
        let errored = error => {
            try {
                if (!isFunction(fail)) {
                    reject(error)
                } else {
                    // 处理链式调用
                    let res = fail(error);
                    if (res instanceof _promise) {
                        res.then(resolve, reject)
                    } else {
                        resolve(res)
                    }
                }
            } catch (err) {
                reject(err)
            }
        }

        switch (self.status) {
            case 'pending':
                // 碰到 那种延时执行的 我就先把 要执行的成功或者失败的函数 存起来 到了时间在执行
                self._successResult.push(fulfilled);
                self._errorResult.push(errored);
                break;
            case 'resolved':
                fulfilled(self.value)
                break;
            case 'rejected':
                errored(self.value)
                break;
        }

    })
    // return new _promise((resolve, reject) => {
    //     if (self.status === 'resolved' && self.value) {
    //         resolve(self.value)
    //         success(self.value)
    //     }
    //     if (self.status === 'rejected') {
    //         reject(self.reason)
    //         fail(self.reason)
    //     }
    // })

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
    setTimeout(function () {
        resolve(555555)
    }, 2000)
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
//     return res;
// }).then(res=>{
//     console.log('success2', res)
// })


// _promise.catch => catch

p1.then(res => {
    console.log('success =>', res)
})
p1.catch(err => {
    console.log(err)
})