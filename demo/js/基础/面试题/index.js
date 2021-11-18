//1. 三次失败走reject
const myaxios = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('cuowu')
        }, 1000)
    })
}

const getdata = (fn, _t) => {
    let _p = myaxios()
    if (_t > 0) {
        return new Promise((resolve, reject) => {
            _p.then(resolve).catch(e => {
                _t -= 1
                resolve(getdata(fn, _t))
            })
        })
    }
    return _p
}
getdata(() => { console.log('执行完毕') }, 3).then(e => {
    console.log('结束了', e)
}).catch(e => { console.log('错误了') })

// 2. 随机打乱数组

let _G = [1, 2, 3, 4]
const _len = _G.length
for (let i = 0; i < _len; i++) {
    const _tempIndex = Math.ceil(Math.random() * _len - 1)
    let _temp = _G[i]
    _G[i] = _G[_tempIndex]
    _G[_tempIndex] = _temp

}
console.log(_G)

// 翻转
let _R = 'renlingxin'

const _reverse = (val) => {
    return val.split('').reverse().join('')
}
console.log(_reverse(_R))


// promise.all

const mypromise = (arr) => {
    return new Promise((resolve, reject) => {
        let _result = []
        let _i = 0
        for (let i = 0; i < arr.length; i++) {
            arr[i].then(res => {
                _result.push(res)
                _i++
                if (_i == arr.length) {
                    resolve && resolve(_result)
                }
            }).catch(e => {
                reject(e)
            })

        }
    })
}
// promise 运行的方式
const t = new Promise(resolve => { resolve(2) })
t.then(r => console.log(r))

// 数组扁平化

const Update = (arr) => {
    let _res = []
    for (let i = 0; i < arr.length; i++) {
        _res = _res.concat(Array.isArray(arr[i]) ? Update(arr[i]) : arr[i])
    }
    return _res
}
console.log('Update', Update([1, 2, [4, 6, [6]]]))

// url 
const _url = 'https://github.com/renlingxin/notes?time=22&last=67'

const GetUrl = (val) => {
    return val.split('?')[1].split('&')
}
console.log(GetUrl(_url))

// settimeout 实现 setInterval
// const _set = (fn, time) => {
//     let _t = setTimeout(() => {
//         fn && fn()
//         _set(fn, time)
//     }, time);

//     return () => {
//         clearTimeout(_t)
//     }

// }
// const cancel = _set(() => { console.log(22222) }, 1000)

// setTimeout(() => {
//     console.log(cancel)
//     cancel()
// }, 4000)


function mySettimeout(fn, t) {
    let timer = null;
    function interval() {
        fn();
        timer = setTimeout(interval, t);
    }
    interval();
    return {
        cancel: () => {
            clearTimeout(timer)
        }
    }
}
let _my = mySettimeout(() => {
    console.log(11111)
}, 1000)
setTimeout(() => {
    console.log(_my.cancel())
}, 4000);

// 手写new 
const mynew = (fn, ...arg) => {
    let _obj = Object.create(fn.prototype)
    let res = fn.call(_obj, ...arg)
    if (res && (typeof res === "object" || typeof res === "function")) {
        return res;
    }
    return _obj;
}
function person() {
    this.name = 'renlingxin'
}
person.prototype.say = function () {
    console.log('rrr', this.name)
}
let _T = mynew(person)
console.log(_T.name)
_T.say()

// 排序
function swap(i, j, arr) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    return arr
}
const _sort = (arr) => {
    let _len = arr.length
    for (let i = _len; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1, arr)
            }
        }
    }
    return arr
}
console.log(_sort([4, 1, 2, 5, 7]))


// 斐波那契数列
//递归
function op(n) {
    if (n < 2) {
        return n
    }
    return op(n - 1) + op(n - 2)
}
console.log('斐波那契数列', op(1))
// 已知
function _op(n) {
    let _res = [0, 1]
    for (let i = 2; i <= n; i++) {
        _res[i] = _res[i - 1] + _res[i - 2]
    }
    return _res[n]
}
console.log('斐波那契数列22', _op(1))

// 实现延迟输出
class sleep {
    constructor(name) {
        this.name = name
        this.task = {}
        this.init()
    }
    init() {
        const fn = () => {
            console.log(this.name)
        }
        this.task[this.name] = fn
    }
    sleep(time) {
        setTimeout(() => {
            this.task[this.name]()
        }, time);
    }
}

let _s = new sleep('ren--sleep')
_s.sleep(2000)

// 防抖
function _Y(fn, time) {
    let _t = null
    return () => {
        if (_t) {
            clearTimeout(_t)
        }
        _t = setTimeout(() => {
            fn && fn()
        }, time)
    }
}

// 节流
function _O(fn, time) {
    let _old = new Date()
    return () => {
        let _new = + new Date()
        if (_new - _old > time) {
            fn && fn()
        }
    }
}

// 去重(利用对象key去重)
function _out(arr) {
    let _res = []
    let _o = {}
    for (let i = 0; i < arr.length; i++) {
        if (_o[arr[i]] === undefined) {
            _res.push(arr[i])
        }
        _o[arr[i]] = i
    }
    return _res
}
console.log('数组去重', _out([2, 4, 5, 2, 6, 4]))

// 去重（set）
function _set(arr) {
    return [...new Set(arr)]
}
console.log('setset', _set([2, 4, 5, 1, 2]))

// 去重 lastIndexOf
function _indexFun(arr) {
    let _res = []
    for (let i = 0; i < arr.length; i++) {
        if (arr.lastIndexOf(arr[i]) === i) {
            _res.push(arr[i])
        }
    }
    return _res
}
console.log('index去重', _indexFun([1, 2, 3, 1, 1]))

// 深拷贝（递归）存在一个问题：在处理很深层级关系的数据时 很大程度会导致内存溢出（递归方法最大的问题在于爆栈，当数据的层次很深是就会栈溢出）
function _clone(target) {
    let _res = Array.isArray(target) ? [] : {}
    for ((item) in target) {
        _res[item] = typeof target[item] === 'object' ? _clone(target[item]) : target[item]
    }
    return _res
}

// 深拷贝中 循环引用会导致 栈溢出 Maximum call stack size exceeded
// let a = {}
// a.a = a
// console.log('深拷贝',_clone(a))


// 深拷贝 JSON
// 优点在于内部API具备循环引用检测。但原理根本还是使用递归 因为深层数据导致的溢出问题依然存在
function _jsonClone(tar) {
    return JSON.parse(JSON.stringify(tar))
}

// 深拷贝 （循环）
function _forClone(tar) {
    const root = {}
    // 建立一个栈
    let loop = [
        {
            parent: root,
            key: undefined,
            data: tar
        }
    ]
    // 遍历栈
    while (loop.length) {
        let node = loop.pop()
        let parent = node.parent
        let key = node.key
        let data = node.data

        // 建立弱引用关系  如果key不是undefined那么拷贝到子集 否则拷贝到父级
        let res = parent
        if (key !== undefined) {
            res = parent[key] = {}
        }
        for (item in data) {
            if (typeof data[item] === 'object') {
                loop.push({
                    parent: res,
                    key: item,
                    data: data[item]
                })
            } else {
                res[item] = data[item]
            }
        }
    }
    return root
}
// 循环的方式 会完美的避开深层数据的栈溢出问题
console.log('循环', _forClone({ name: 'ren', key: 24, parent: { name: 'muqin', key: 18 } }))


// 拷贝中的另一个问题(key依赖的是同一个引用 那么就没有必要去分别拷贝)

let b = { b: 2 }
let a1 = { a2: b, a3: b }
console.log('比较问题', a1.a2 === a1.a3)//true
let _B = _forClone(a1)
console.log('比较问题2', _B.a2 === _B.a3)//false

// 解决方法 （不仅可以破解重复引用还可以破解循环引用）
function _forClone1(tar) {
    let uni = []
    const root = {}
    // 建立一个栈
    let loop = [
        {
            parent: root,
            key: undefined,
            data: tar
        }
    ]
    // 遍历栈
    while (loop.length) {
        let node = loop.pop()
        let parent = node.parent
        let key = node.key
        let data = node.data

        // 建立弱引用关系  如果key不是undefined那么拷贝到子集 否则拷贝到父级
        let res = parent
        if (key !== undefined) {
            res = parent[key] = {}
        }
        // 通过去重数组判断是否是重复引用
        const isUni = uni.find(e => e.data === data)
        if (isUni) {
            parent[key] = isUni.par
            break
        }
        // 添加value到去重数组
        uni.push({
            par: res,
            data: data
        })
        for (item in data) {
            if (typeof data[item] === 'object') {
                loop.push({
                    parent: res,
                    key: item,
                    data: data[item]
                })
            } else {
                res[item] = data[item]
            }
        }
    }
    return root
}
// 破解重复引用
let c = { b: 2 }
let _a1 = { a2: c, a3: c }
console.log('比较问题111111', _a1.a2 === _a1.a3)//true
let _B1 = _forClone1(_a1)
console.log('比较问题2222222', _B1.a2 === _B1.a3)//

// 破解循环引用
let _o = {}
_o.a = _o
console.log('破解循环引用', (_forClone1(_o)))


// 数组扁平化（flat）
const f = [1, 2, 3, [4, 5, [6]]]
console.log(f.flat(Infinity), '数组扁平化')

// 数组扁平化 （reduce）

function _reducer(arr) {
    return arr.reduce((pre, cru) => {
        return pre.concat(Array.isArray(cru) ? _reducer(cru) : cru)
    }, [])
}
console.log(_reducer(f), 'fffffff')

// 数组扁平化 （循环)
function _forFlat(arr) {
    let _res = []
    for (let i = 0; i < arr.length; i++) {
        _res = _res.concat(Array.isArray(arr[i]) ? _forFlat(arr[i]) : arr[i])
    }
    return _res
}
console.log(_forFlat(f), '数组扁平化（循环）')


// 栈 四则运算
let s = '1+2*5+3'
function _four(s) {
    let _res = []
    for (let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '+':
                _res.push((s[i]))
                break;
            case '-':
                _res.push((s[i]))
                break;
            case '*':
                let _last = _res.pop()
                let _o = _last * s[i + 1]
                _res.push(_o)
                i++
                break;
            case '/':
                let _last1 = _res.pop()
                let _o1 = _last1 / s[i + 1]
                _res.push(_o1)
                i++
                break;
            default:
                _res.push(Number(s[i]))
                break
        }
    }
    let _j = 0
    while (_j < _res.length) {
        switch (_res[_j]) {
            case '+':
                _res[_j+1] = _res[_j-1] + _res[_j+1]
                break;
            case '-':
                _res[_j+1] = _res[_j-1] - _res[_j+1]
                break;
        }
        _j++

    }
    return _res.pop()
}
console.log('四则运算', _four(s))

// call
// 使用
var nameRen = 'xxxxxxxxx'
console.log(this,'2222') //这里没有全局的window 所以this只是一个空对象

let _obj = {
    nameRen:'eeeeeeeeeee',
    sayname:function(){
        console.log(this.nameRen,'this.nameren')
    }
}
function sayname(){
    console.log(arguments,'验证是否是严格模式')
    console.log(this.nameRen,'this.nameren')
}
_obj.sayname()
sayname(2)
sayname.call(_obj)

function mycall(content= {}, ...args){
    content.$fn = this
    let _res = content.$fn(...args)
    content.$fn = null
    return _res
}


