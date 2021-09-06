// let arr = ['ren', 'ren', 'ling', 'xin']
// let _arr = arr.reduce((pre, cru) => {
//     if (cru in pre) {
//         pre[cru]++
//     } else {
//         pre[cru] = 1
//     }
//     return pre
// }, {})
// console.log('数组中的出现次数：', _arr)

// let arr1 = [12, 32, [32, 453, 2], 2]
// const _arr2 = arr1 => arr1.reduce((pre, cru) => {
//     return pre.concat(Array.isArray(cru) ? _arr2(cru) : cru)
// }, [])
// console.log('扁平化数组：', _arr2(arr1))

// let _arr3 = [{
//     id: 1,
//     name: 'xxx'
// }, {
//     id: 2,
//     name: 'eee'
// }]
// let _arr4 = _arr3.reduce((pre, cru) => {
//     return {
//         ...pre,
//         [cru.id]: cru
//     }
// })
// console.log('数组转换为对象：', _arr4)


// let _arr5 = [12,34,34,4554]
// let _arr6 = _arr5.reduce((pre,cru)=>{
//     return Math.max(pre,cru)
// })
// console.log('求数组最大值：',_arr6)


// let _arr7 = [12,34,34,4,23]
// let _arr8 = _arr7.reduce((pre,cru)=>{
//     return pre+cru
// })
// console.log('数组求和等数值操作：',_arr8)

// let r = ['ren', 'ling', 'ren', 'xin']
let r = [1, 2, 1, 3]
let _r = r.reduce((pre, cru) => {
    if (cru in pre) {
        pre[cru]++
    } else {
        pre[cru] = 1
    }
    return pre
}, {})
console.log('元素出现次数', _r)

let _b = r.reduce((pre, cru) => {
    return pre * cru
})
console.log('求和', _b)

let c = [1, 2, 3, 2, [23, 45, [6, 67]], 34]

let _c = r => r.reduce((pre, cru) => {
    return pre.concat(Array.isArray(cru) ? _c(cru) : cru)
}, [])
console.log('数组扁平化', _c(c))

let _n = n => n.reduce((pre, cru) => {
    return Math.max(pre, cru)
})
console.log('极限值', _n(_c(c)))

// 获取固定年份到当前年份数组
function getYears(endYear, startYear = 2018) {
    let _res = []
    // for (let i = startYear; i <= endYear; i++) {
    //     _res.push(i)
    // }
    while (startYear <= endYear) {
        _res.push(startYear)
        startYear++
    }
    return _res
}
let _date = new Date()
console.log(getYears(_date.getFullYear()))



