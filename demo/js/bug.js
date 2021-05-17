// var a = {
//     n: 1
// }
// var b = a;
// console.log(a)
// console.log(b)
// console.log('------------------')

// a.x = a = {
//     n: 2
// }
// console.log(a.x)
// console.log(b.x)
// console.log('------------------')

// console.log(a)
// console.log(b)
// // async await

// async function time() {
//     return ''
// }
// console.log(time()) //得到一个promise对象

// function promiseValit(data) {
//     return new Promise((resolve, reject) => {
//         console.log('2秒后输出')
//         setTimeout(() => {
//             resolve(data + 1)
//         }, 2000)
//     })
// }

// async function test(m, n) {
//     let num = Math.floor(Math.random() * (m - n + 1) + n)
//     let _res = await promiseValit(num).then(res => {
//         console.log('result', res)
//         return res
//     }).catch(console.log)
//     console.log('_res', _res)
// }
// test(8, 2)

// // 暂时性死区
// try {
//     console.log(res)
//     let res = ''
// } catch (e) {
//     // console.log(e)
// }

// // let 不能重复定义
// let bas = '22'
// // let bas = 44444
// console.log(bas)

// let pro = new Promise((resolve, reject) => {
//     try {
//         console.log(res)
//         let res = ''
//         resolve('res')
//     } catch (e) {
//         reject('e')
//         // console.log(e)
//     }
// })
// pro.then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(err)
//     })


// 实现只执行一次的函数
// function getname(fn) {
//     let one = false
//     return function () {
//         if (!one) {
//             one = true
//             fn.apply(this, arguments)
//         }
//     }
// }

// function name() {
//     console.log(2222222)
// }
// const once = getname(name)
// once()


// (function(){
//     console.log(22222)
// })()
// let oq = {name:'32'}
// for(let n in Object.keys(oq)){console.log(n)}



// 定义包含菜品详细信息
let obj = [{
    id: 'ITEM0001',
    text: '黄焖鸡',
    price: 18
}, {
    id: 'ITEM0013',
    text: '肉夹馍',
    price: 6
}, {
    id: 'ITEM0022',
    text: '凉皮',
    price: 8
}]

function bestCharge(order) {
    // 分别统计两种优惠方式
    let total1 = 0
    let total2 = 0
    console.log('=========订单明细=========')
    order.forEach(el => {
        let _el = el.split(' ')
        obj.forEach(item => {
            if (item.id === _el[0]) {
                _el[0] = item.text
                _el[3] = '='
                _el[4] = item.price * _el[2]
                el = _el.join('')
                // 计算总价
                total1 += _el[4]
                if (item.text == '黄焖鸡' || item.text == '凉皮') {
                    total2 += _el[4] / 2
                } else {
                    total2 += _el[4]
                }
            }
        })
        console.log(el)
    })
    console.log('------------------------')
    if (total1 != total2) {
        // 计算差价
        let _res = total1 - total2
        // 计算满30优惠后的价格
        total1 >= 30 ? total1 -= 6 : ''
        console.log('使用优惠：')
        if (total1 <= total2) {
            console.log('满30减6元，省6元')
            console.log('------------------------')
            console.log('总计:' + total1 + '元')
        } else {
            console.log(`指定菜品半价(黄焖鸡，凉皮)，省${_res}元`)
            console.log('------------------------')
            console.log('总计:' + total2 + '元')
        }
    } else {
        console.log('总计:' + total2 + '元')
    }
}


// 测试
// bestCharge(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"])
// bestCharge(["ITEM0013 x 4", "ITEM0022 x 1"])
// bestCharge(["ITEM0013 x 4"])

//获取URL参数
// function getUrl(str){
//     let obj={}
//     let index = str.indexOf('?')
//     let args = str.substr(index+1).split('&&')
//     args.map(el=>{
//         let ind = el.indexOf('=')
//         obj[el.substr(0,ind)] = el.substr(ind+1)
//     })
//     console.log(obj)
// }
// getUrl('http://xxx.com?asd=1&&zc=55&&bgc=999')

//需要几个会议室
// function meeting(time){
//     let count = 0
//     for(let i=0;i<time.length;i++){
//         for(let j=i+1;j<time.length;j++){
//             if(time[j][0] < time[i][1] && time[j][0] > time[i][0]){
//                 //上一次的开始时间 < 下一个会议的开始时间 < 上一次的结束时间，会议室+1
//                 count++
//             }
//         }
//     }
//     return count
// }
// meeting([[10,20],[19,30],[25,30]])
var a  = 'ijojio';
(function(){
    var a = 3
    console.log(a);
    // var b = a
    // var a = b = 3
    // console.log(typeof a, 'a defined? '+(typeof a !== 'undefined'));
    // console.log(typeof b, 'b defined? '+(typeof b !== 'undefined'));
})()
// console.log(typeof a, 'a defined? '+(typeof a !== 'undefined'));
// console.log(typeof b, 'b defined? '+(typeof b !== 'undefined'));