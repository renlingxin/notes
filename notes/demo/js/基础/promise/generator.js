/*
 * @Author: your name
 * @Date: 2020-09-04 17:23:59
 * @LastEditTime: 2021-02-25 10:52:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-notes/notes/demo/js/基础/promise/generator.js
 */
// generator 异步协程 生成器 可以使用return 终止

const { O_CREAT } = require("constants");

// {value:'',done:true} 生成器返回的数据结构 value 是内容值 done 指示是否循环完毕
const time = function (val) {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(val)
            console.log(val)
        }, 2000);
    })

}

function* peropleStatus() {
    yield time,
    yield 'resolve',
    yield 'reject'
    return 'end'
}

let r = peropleStatus()

console.log(r.next())
console.log(r.next())
console.log(r.next())
console.log(r.next())


let res = [1, 2, 4, 33, 42, 4, 2]

async function getimg() {
    for (let i = 0; i < res.length; i++) {
        await time(res[i])
    }
}

// getimg()

// yield 可以循环使用多次
function* bb(t){
    let i =0 
    while (i<t){
        yield i
        i++
    }
}
for(i of bb(3)){
    console.log('i',i)
}

// yield可以接收到next传入的值
function* cc(){
    console.log('rrrr')
    console.log(yield) 
    console.log(yield) 
}
let y = cc()
console.log(y.next('gggggg').value) // rrrr 因为要先执行以下函数
console.log(y.next('wwwwww').value) // wwwwww 输出传入的值
console.log(y.next('tttttt').value) // tttttt 输出传入的值
console.log(y.next().value);  // undefined 空值


// yield* 可以理解为迭代器
function* yy(){
    yield* [1,2,4]
}
for(j of yy()){
    console.log(j)
}


// 实现具备iterator协议的数据结构

function onc(n){
    let i = 0;
    return {
        next:function(){
            return i < n ? {value:i++,done:false}: {done:true}
        }
    }
}
let b = onc(3)
console.log(b.next())
console.log(b.next())
console.log(b.next())
console.log(b.next())