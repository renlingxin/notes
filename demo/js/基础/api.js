// arr => reverse()  字符串倒转
let arr1 = [1, 2, 7, 4, 5, 6]
let arr2 = ['left', 'top', 'lose']
let arr3 = ['贴膜', '部署', '姓名']

Array.prototype.againReverse = function () {
    let _len = this.length
    let _reset = []
    for (let i = 0; i <= _len - 1; ++i) {
        _reset[_reset.length] = this[_len - i - 1]
    }
    for (let j = 0; j <= _len - 1; ++j) {
        this[j] = _reset[j]
    }
    return this
}
arr1.againReverse()
arr2.againReverse()
arr3.againReverse()
console.log(arr1, arr2, arr3)

// arr => sort()  排序
// 注释：js底层的排序 length小于 10|22 使用InsertionSort(插入排序)  大于的情况使用QuickSort(快速排序)
Array.prototype.AgainSort = function () {
    let len = this.length
    let inner = null
    let temp = null
    for (let i = 1; i <= len - 1; ++i) {
        inner = i
        temp = this[inner]
        while (inner > 0 && this[inner - 1] > temp) {
            this[inner] = this[inner - 1]
            inner--
        }
        this[inner] = temp
    }
    return this
}
console.log(arr1.AgainSort())

// arr => concat()

const dictsMap = function (dict,arr) {
    if(!dict instanceof Array || !arr instanceof Array){
        return 
    }
    console.log(JSON.stringify(arguments, null ,2))
    let result = dict;
    for (let i = 1; i < arguments.length; i++) {
        if (i == arguments.length - 1) {
            if (result.filter(el => el.value == arguments[i]).length < 1) {
                result = ''
            } else {
                result = result.filter(el => el.value == arguments[i])[0].text;
            }
        } else if (result.hasOwnProperty('children')) {
            result = result.filter(el => el.value == arguments[i])[0].children;
        }
    }
    return result;
}
dictsMap(['aa'],[22])

console.log(process.env.NODE_ENV)
const getNow = () => {
     return String(Date.now())
}
console.log(getNow())
console.log(Date.now())
console.log(new Date().getTime())


// 数据操作
function fn1() {
    let _fun = arguments
    return (m) => {
        for (let i = 0; i < _fun.length; ++i) {
            m = _fun[i](m)
        }
        return m
    }
}

let f1 = (x) => x + x
let f2 = (x) => x * x
let f3 = (x) => x + x

console.log(fn1(f1, f2, f3)(4))
// var _res = []
// _res[9] = undefined
// console.log(_res)

// forEach 循环
Array.prototype._forEach = function (callback) {
    let self = this
    for (let i = 0; self.length; ++i) {
        if (self[i] && Number(self[i]) !== 0) {
            callback(self[i], i, self)
        } else {
            return
        }
    }
}
let _arr = [1, 2, 6, 8, {
    name: 'renlingxin'
}]
// _arr.forEach((item,index)=>{
//     if(item === 6){
//         return
//     }
//     console.log(item)
// })
_arr._forEach((item, index) => {
    if (index === 4) {
        item = 'xxxx'
    }
    console.log(item,index)
})
// p().then(f1, f2).then(f3, f4).then(f5, f6)