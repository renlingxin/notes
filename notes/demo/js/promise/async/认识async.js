function fn1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('你好');

            resolve();
        }, 1000);
    })
}
(async function () {
    // await是表示这行代码是一个异步操作，下面的代码会在这个异步操作后执行
    // 这里的异步操作其实就是resolve
    await fn1();
    console.log('第二步');
    await fn1();
    await fn1();
    console.log('第三步');
    
})();
console.log('hell')