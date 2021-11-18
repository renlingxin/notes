/*
 * @Author: your name
 * @Date: 2021-11-15 13:26:16
 * @LastEditTime: 2021-11-16 20:28:31
 * @LastEditors: Please set LastEditors
 * @Description: 实用考点
 * @FilePath: /github/demo/专项/js/3.js
 */

// 1. 生成0-n的数组
// Array.keys() 方法返回一个包含数组中每个索引键的Array Iterator对象，该索引迭代器会包含那些空位元素的索引。

function makeArr(n) {
    // return Array.from(Array(n).keys()) // 1. es6 Array.from

    // return [...Array(n).keys()] // 2. es6 剩余运算符 ...  1和2的缺点是索引是0开始

    // let res = []
    // for(let i=0;i<n;i++){
    //     res.push(i)
    // }
    // return res // 3. es5 常规方式 for 循环

    return Array(n).fill(1).map((v, c) => c + 1) // fill填充 map遍历索引+1
}
console.log(makeArr(10), 'makeArrmakeArr')


let t = [{
    count: 3,
    countSum: 7
}]
t.forEach(item => {
    item.count = item.countSum || item.count
});
console.log(t)