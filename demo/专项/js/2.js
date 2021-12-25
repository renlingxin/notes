// promise

// 1. 可以暂停的promise  - 令牌

class outPromise {
    constructor(cancelFun) {
        this.promise = new Promise((resolve, reject) => {
            cancelFun(() => {
                resolve()
                console.log('cancelFun ---- 期约暂停')
            })
        })
    }
}




// 2. async await  --- async return 值是promise 
function getRes() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: 'renlinginx'
            })
        }, 1000)
    })
}

async function getResApi() {
    let res = await getRes()
    console.log(res)
    return res.data
}
getResApi().then(res => {
    console.log(res, '6666')
})
console.log(getResApi(), 'getResApi()')

