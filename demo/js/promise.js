function _promise(exec) {
    let self = this
    self.value = ''
    self.reason = ''
    self.status = 'pending'

    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value
            self.status = 'resolved'
        }
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
    if (self.status === 'resolved' && success) {
        success(self.value)
    }
    if (self.status === 'rejected' && fail) {
        fail(self.reason)
    }
}
_promise.prototype.then.catch = function (fails) {
    let self = this
    if (self.status === 'rejected') {
        fails(self.reason)
    }
}
_promise.prototype.all = function (_promiseArr) {
    return new _promise((resolve, reject) => {

    })
}
let p1 = new _promise((resolve, reject) => {
    reject(22)
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
// console.log(p1)
// p1.all()
// export default _promise;


// select * from tables;
// insert into tables (key) values (value); 
// delete from tables where id = 1;
// update tables set key = value;