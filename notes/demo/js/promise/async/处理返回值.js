function fn1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            resolve('你好');
        }, 1000);
    })
}

// await 必须在 async 函数中执行
// await 操作可以有返回值，这个返回值表示promise操作成功的返回值
// 如果await里面执行的异步操作发生了reject,或者发生了错误，那么只能使用try...catch语法来进行处理

(async function () {

    const res = await fn1();
    console.log('第一次' + res);

    const res1 = await fn1();
    console.log('第二次' + res1);

    const res2 = await fn1();
    console.log('第三次' + res2);
})();

console.log(fn1)
// es6 定义类

function Person() {

}
var p1 = new Person();

class Student {

}
var s1 = new Student();