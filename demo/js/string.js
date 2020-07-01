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