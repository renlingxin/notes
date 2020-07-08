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