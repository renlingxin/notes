let name = 'ssss[起始序号_02]aaaa[ddd]'

let nums = 1
let rex = /\[(.*?)\]/g
let _array = []
let temp
// while ((temp = rex.exec(name))) { 
//   _array.push(temp[0])
// }
name.replace(/\[(.*?)\]/g, (...args) => {
    console.log(args)
    _array.push(args[0])
})
_array.filter(item => {
    if (item.includes('起始序号')) {
        let num = []
        item.split('').forEach(ele => {
            if (!isNaN(Number(ele))) {
                num.push(ele)
            }
        })
        nums = num.join('')
    }
})
console.log(nums)


var p = new Promise((resolve)=>{
    console.log('a')
    resolve()
}).then(()=>{
    console.log('b')
})
setTimeout(()=>{
    console.log('c')
    Promise.resolve().then(()=>{
        console.log('d')
        setTimeout(()=>{
            console.log('e')
        },0)
    }).then(()=>{
        console.log('f')
    })
},0)
console.log('g')
let _index = 1
let _res = []
while(_index<=100){
    if(_index%3 === 0){
        _res.push(_index)
    }
    ++_index
}
console.log(_res)

let rse = 'http://server.mengzhuang&projectKey=WXRENLIGXIN&VIEW=fddd'
let reg = /[?&]projectKey=([^&]*)/
console.log('fff', reg.exec(rse)[1])