/*
添加/删除数组
    push
    pop
    shift 
    unshift
    splice
    concat
查询数组
    indexOf/lastindexOf
    includes
    find/fiter
    findIndex
转换数组
    map
    sort
    reverse
    split/join
    reduce
迭代元素
    forEach
其他
    Array.isArray
    some/every
    fill(value,start,end)从start到end用value填充数组
    copyWithin(target,start,end)

sort reverse splice  方法修改数组本身
/ 

/**
 * 数组方法  --- 1 array.prototype.flat (扁平化数组)
 * Infinity -- 无穷大
 */

console.log('------------1 array.prototype.flat (扁平化数组)------------')


let arr = [1, 2, 3, 2, [34, 243, 3, [56, 21, 89, [23]]]]
console.log(arr.flat(2))
console.log(arr.flat(5))
console.log('flat实现', arr.flat(Infinity))

// 扩展 -- 其他数组扁平化方法
// (1) reduce
let _arr = arr => arr.reduce((pre, cru) => {
    return pre.concat(Array.isArray(cru) ? _arr(cru) : cru)
}, [])
console.log('reduce实现', _arr(arr))
// 递归
let out = arr => {
    let _res = []
    for (let i = 0; i < arr.length; i++) {
        Array.isArray(arr[i]) ? _res = _res.concat(out(arr[i])) : _res.push(arr[i])
    }
    return _res
}
console.log('递归实现', out(arr))
// 扩展运算符
let star = arr => {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
console.log('扩展运算符实现', star(arr))

/**
 * 2. 生成大量数组数据fill
 */

console.log('------------2 fill() 生成大量数组数据fill------------')

const att = new Array(100).fill(0).map((item,index)=>index+1)
const abb = Array.from(Array(100),(v,k)=>k+1)
const aoo = [...Array(100).keys()]
// console.log(att)
// console.log(abb)
// console.log(aoo)


/**
 * 3. 解构赋值
 */

console.log('------------3 解构赋值------------')
// 交换变量
let a = '1111';
let c = '2222';
[a, c] = [c, a]
console.log(a,c)

// 生成剩余数组
const [b, ...rest] = [...'renlingxin']
console.log(b,rest)


/**
 * 4. 数组浅拷贝 slice ...
 */

console.log('------------4. 数组浅拷贝------------')
// slice
let old = [1,2,3,4]
let newVale = old.slice()
console.log(newVale)

// ...
let newVale1 = [...old]
console.log(newVale1)

// Array.from
let newVale2 = Array.from(old)
console.log(newVale2)


/**
 * 5. 数组去重 new Set
 */

console.log('------------5. 数组去重------------')
let repeat = [1,2,34,3,333333,3,3,56,67]
// let newRepeat = Array.from(new Set(repeat))
let newRepeat = [...new Set(repeat)]
console.log(newRepeat)

/**
 * 6. 查找符合条件的内容 find findIndex
 */

console.log('------------6. 查找符合条件的内容------------')

let openObject = [1,2,3,4,5555,6,0]
let openRes = openObject.find(item=>item>3)
console.log(openRes) //返回符合条件的第一个元素

let openResIndex = openObject.findIndex(item=>item>3)
console.log(openResIndex) //返回符合条件的第一个元素


/**
 * 7. include indexOf
 */

console.log('------------ 7. include indexOf------------')

let injectData = [1,2,3,4,,4,5,5,63,2,NaN]
console.log(injectData.includes(2), injectData.includes(NaN))
console.log(injectData.indexOf(2), injectData.indexOf(NaN)) // indexOf 查不到NaN返回-1




// JSON的一些扩展方法

console.log('------------JSON的一些扩展方法------------')

let arr1 = [{
    id: 1,
    name: 'ren',
    age: 23
}, {
    id: 2,
    name: 'ling',
    age: 243
}, {
    id: 3,
    name: 'xin',
    age: 23
}]
let arr2 = [1, 2, 3]
let obj1 = {
    id: 33,
    time: '2020-02-3',
    age: 333
}

function filterRen(obj, want) {
    let res = JSON.stringify(obj, want, 2)
    return JSON.stringify(obj, want, 2)
}
console.log(filterRen(arr1, ['id', 'name']))
console.log(filterRen(arr2, ['2']))
console.log(filterRen(obj1, ['id', 'time']))