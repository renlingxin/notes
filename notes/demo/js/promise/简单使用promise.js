function fn1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('第一步');
            // 其实异步逻辑到这里其实已经执行完毕了
            // 就可以告诉外界，可以执行其他操作了          
            resolve();
        }, 1000);
    })
}

function fn2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('第二步');
            // 其实异步逻辑到这里其实已经执行完毕了
            // 就可以告诉外界，可以执行其他操作了
            // 执行的下一步操作就是在then的回调函数中
            resolve();
        }, 1000);
    })
}
// 链式调用
fn1().then((res) => {
    return fn2();
}).then((res) => {
    return fn1();
}).then((res) => {
    return fn2();
}).then((res) => {
    setTimeout(() => {
        console.log('完成')
    },1000)
})