const fs = require('fs');
const { resolve } = require('path');


// 哨兵变量
let sentry = 0

function getResult() {
    sentry++
    if (sentry === 2) {
        console.log('文章读完了')
    }
}

// 偏函数 + 哨兵变量

function myRender() {
    let count = 0
    let _res = []
    return function (data) {
        console.log(count)
        count++
        _res[count] = data
        if (count === 2) {
            console.log('------------文章读完了')
            console.log(_res)
        }
    }
}

let myRenderChild = myRender()

fs.readFile('./tree.text', 'utf-8', (err, data) => {
    // console.log('1.<' + data + '>')
    myRenderChild(data)
})


fs.readFile('./name.text', 'utf-8', (err, data) => {
    // console.log('2.<' + data + '>')
    myRenderChild(data)
})


let t = ()=>{
    return new Promise((resolve)=>{
        resolve('1')
        resolve('2')
    })
}
async function y(){
        const r = await t()
        console.log('22222222222',r)
}
y()
