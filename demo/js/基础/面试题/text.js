// 1. TCP UDP websocket http https的区别 
// 2. Async await promise
const name = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve && resolve('ren-ling-xin')
        }, 2000)
    })
}
async function getname() {
    const _na = await name()
    console.log(_na)
}

// 并发操作
for (let i = 0; i < 4; i++) {
    getname()
}




// 3. 页面性能优化

// 4. 排序 快速排序 以及时间复杂度
function _sort(arr) {
    if (arr.length === 0) return []
    let _i = arr[0]
    let _left = []
    let _right = []
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < _i) {
            _left.push(arr[i])
        } else {
            _right.push(arr[i])
        }
    }
    return _sort(_left).concat(_i, _sort(_right))
}
console.log('222', _sort([2, 3, 5, 7]))

// 5. 304 状态码
// 301 =》 永久重定向
// 302 =》 临时重定向
// 303 =》 查看其它位置
// 304 =》 未修改（自上次请求之后没有发生改变）

// 400 =》 服务器不理解
// 401 =》 未授权
// 403 =》 服务器拒绝了
// 404 =》 未找到

// 500 =》 服务器内部错误
// 503 =》 服务器压力过大

// 6. SDK 导出格式
// package.json ：
// name 姓名 version 版本 main 入口 files 导出文件

// 7. eventloop
// 同步任务 异步任务（宏任务和微任务）
// 宏任务 =》 setTimeout setInterval
// 微任务 =》 promise 


// 8. 堆栈 原型链
// 基础数据类型 =》 栈
// 复杂数据类型 =》 堆 并且在栈中存在堆的引用

//原型 


// 9. 面向对象三大特性 =》 继承 多态 封装


// 10. tips
let t = { name: 'renlginxim' }
let y = t = {}
console.log('yyyy', y, t)
// 11. 设备像素比 （告诉设备1px用多少物理像素描述）

// 12. viewport

// 13. 前端安全 XSS XSRF

// 14. Hybrid通信方式

// 15. 代码操作dom的执行时机

// 16. 回流和重排

// 17. Eventloop

// 18. var的变量提升 window是否都会挂载

// 19. requestAnimationFrame 执行时机

// 20. rem原理 （是否改变根元素）

// 21. h5 新特性 (有一个能实现滚动条)

// 22. 箭头函数和普通函数区别（是否是构造函数和作用域问题）

// 23. css in js

// 24. css 哪些可以被继承

// 25. scss 和 less 中定义变量方式

// 26. 函数的执行过程

// 27. cookie是谁存的
// Cookie是由服务器端生成，发送给User-Agent（一般是浏览器），（服务器告诉浏览器设置一下cookie），浏览器自动会将Cookie以key/value保存到某个目录下的文本文件内，下次请求同一网站时也会自动发送该Cookie给服务器，即添加在请求头部（前提是浏览器设置为启用cookie）。
// Cookie就是一个小型文件（浏览器对cookie的内存大小是有限制的-------用来记录一些信息）

// cookie的一些属性 name 

// 设置cookie document.cookie='name=xiaoming;expires='+oDate





// 两数之和
// 给定 nums = [2, 7, 11, 15], target = 9
function _teo(arr, target) {
    // let _i = null
    let _ob = {}
    for (let i = 0; i < arr.length; i++) {
        _ob[arr[i]] = i
        let _i = target - arr[i]
        if (_ob[_i] !== undefined) {
            return [_ob[_i], i]
        }
    }
}
console.log('_teo', _teo([2, 11, 15, 7], 9))


// 斐波那契数列 （递归） 0 1 1 2
function _y(n) {
    if (n < 2) {
        return n
    }
    return _y(n - 1) + _y(n - 2)
}
console.log('piepeipepe', _y(6))

// 斐波那契数列 （循环） 0 1 1 2 循环的方法可以避免递归导致的栈泄露问题
function _oo(n) {
    let _res = [0, 1]
    for (let i = 2; i <= n; i++) {
        _res[i] = _res[i - 1] + _res[i - 2]
    }
    return _res[n]
}
console.log('piepeipepe', _oo(6))

// css 边距塌陷问题

var id = 'Global';

function fun1() {
    // setTimeout中使用普通函数
    // setTimeout(function(){
    console.log('fun1', this.id);
    // }, 2000);
}

function fun2() {
    // setTimeout中使用箭头函数
    setTimeout(() => {
        console.log('fun2', this.id);
    }, 2000)
}

fun1.call({ id: 'Obj' });     // 'Global'

fun2.call({ id: 'Obj' });     // 'Obj'

// 输出0-10000的回文数
function _con() {
    for (let j = 0; j <= 10000; j++) {
        if (_is(j)) {
            console.log(j)
        }
    }
}
function _is(target) {
    target += ''
    let _left = 0
    let _right = target.length - 1
    while (_left < _right) {
        if (target[_left] !== target[_right]) {
            return false
        }
        _left++
        _right--
    }
    return true
}
//_con()
// 获取字符出现的次数
function _getSize(str) {
    let _res = {}
    for (let i = 0; i < str.length; i++) {
        if (_res[str[i]] !== undefined) {
            _res[str[i]]++
        } else {
            _res[str[i]] = 1
        }
    }
    return _res
}
let r = _getSize('eeeeddd')
console.log(r['d'])


// 对象引用问题
let foo = { n: 1 }
let bar = foo
// foo.x = foo = {n:2} //foo.x 改变了foo和bar foo = {n:2} 是直接赋值了对象 并没有改变对象所以bar没有跟着改变
// 可以拆解成
foo.x = foo
foo = { n: 2 }
console.log(foo, bar, 'js中的奇怪问题')


// let typeof
function o() {
    let a = b = 0//这里可以拆解成let a=0 b=0 b被定义到了全局
    a++
    return a
}
o()
// console.log(a)//直接打印a会报错
console.log(b, 'ttttt')//0
console.log(typeof a, typeof b, '344444')


// 执行顺序
console.log(1111)

const m = () => {
    return new Promise((resolve) => {
        resolve(2222)
        console.log(5555)
        setTimeout(() => {
            console.log(3333)
        }, 0);
    })
}
m().then(res => { console.log(res) })

console.log(4444)

// 作用域
this.n = 44
const _p = {
    n: 1,
    say: function () {
        // console.log('22222222',n)  当前这个函数没有n
        console.log(this.n, '结果')
    }
}
const _p1 = {
    n: 2,
    say: () => {
        // console.log('22222222',n)
        console.log(this.n, '结果2')
    }
}
_p.say()
_p1.say()

// 手写instanceof
function new_instance_of(leftVaule, rightVaule) {
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
        if (leftVaule === null) {
            return false;
        }
        if (leftVaule === rightProto) {
            return true;
        }
        leftVaule = leftVaule.__proto__
    }
}

Object.prototype._call = function (target, ...args) {
    target.$fn = this
    let _res = target.$fn(...args)
    target.$fn = null
    return _res
}

function _all(arr) {
    return new Promise((resolve, reject) => {
        let _res = []
        let _index = 0
        let _len = arr.length
        for (let i = 0; i < _len; i++) {
            arr[i]
                .then(res => {
                    _res[i] = res
                    _index++
                    if (_index === _len) {
                        resolve(_res)
                    }
                })
                .catch(e => {
                    reject(e)
                })
        }
    })
}

function _new(tar, ...args) {
    let _pro = Object.create(Object.prototype)
    let _res = tar.call(_pro, ...args)

    return _res
}

function _pei(n) {
    // let _res = [0, 1]
    // for (let i = 2; i <= n; i++) {
    //     _res[i] = _res[i - 1] + _res[i - 2]
    // }
    // return _res
    if (n <= 1) {
        return n
    } else {
        return _pei(n - 1) + _pei(n - 2)
    }
}

function getdata(t) {

    let _p = myaxios()
    if (t > 0) {
        return new Promise((resolve, reject) => {
            _p.then(res => {
                resolve(res)
                t -= 1
            }).catch(() => getdata(t))
        })
    } else {
        return _p
    }
}

function _bian(arr) {
    let _res = []
    for (let i = 0; i < arr.length; i++) {
        _res = _res.concat(Array.isArray(arr[i]) ? _bian(arr[i]) : arr[i])
    }
    return _res
}

function _shen(tar) {
    let _res = Array.isArray(tar) ? [] : {}
    for (item in tar) {
        _res[item] = typeof tar[item] == 'object' ? _shen(tar[item]) : tar[item]
    }
    return _res
}

function _kuai(arr) {
    let _con = arr[0]
    let _left = []
    let _right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < _con) {
            _left.push(arr[i])
        } else {
            _right.push(arr[i])
        }
    }
    return _con.concat(_kuai(_left), _kuai(_right))
}

// 箭头函数的this指向
let namew = '3343'
function ttt() {
    let namew = 'resnlingnx'
    return function () {
        console.log('箭头函数的结果', namew)
    }
}
let ryy = ttt()
ryy()

// 
function _jie(fn, t) {
    let _time = null
    return () => {
        if (_time) {
            clearTimeout(_time)
        }
        _time = setTimeout(() => {
            fn && fn()
        }, t);
    }
}
function getdata() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve && resolve(111)
        }, 1000);
    })
}
function _last(getdata) {
    let _time = 0
    return function () {
        _time++
        let _new = _time
        setTimeout(() => {
            console.log(_new, _time, '_new_new_new')
            if (_new === _time) {
                console.log(333333333)
            }
        }, 1000);
    }
}
let _i = _last()
_i()
_i()
_i()
// _last().then(res => console.log('last', res))
// _last().then(res => console.log('last', res))
// _last().then(res => console.log('last', res))




class _t {
    constructor() {
        this._res = []
    }
    $on(name, fn) {
        let _u = this._res.find(e => e.name === name)
        if (_u) {
            _u._fn.push(fn)
        } else {
            this._res.push({
                name,
                _fn: [fn]
            })
        }
    }
    $emit(name, ...args) {
        let _o = this._res.find(e => e.name === name)
        if (!_o) return
        _o._fn.forEach(e => {
            e(args)
        })
    }
}
let _idex = new _t()
_idex.$on('renlingxin', () => { console.log('回调执行') })
// _idex.$emit('renlingxin')



function con(arr) {
    let _end = arr[0].length
    let _len = arr.length
    let _arr = []
    let _left = 0
    let _right = _end
    while (_arr.length !== _end) {
        if (_left === 0) {
            for (let i = 0; i < _end; i++) {
                _arr.push(arr[_left[i]])
                console.log(arr[_left[i]])
            }
            _left++
        } else if (_left === _len) {
            for (let j = _end; j >= 0; j--) {
                _arr.push(arr[_left[i]])
                console.log(arr[_left[i]])
            }
            _left--
            _right = 0
        } else {
            _arr.push(arr[_left][_right])
            console.log(arr[_left][_right])
            _right++
        }
    }
}
con([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

// function _new(arr,...args){
//         let _obj = Object.create(arr.prototype)
//         let _res = arr.call(_obj,...args)
//         return _res
// }


// 顺时针循环双重数组
function _con(arr) {
    let _res = []
    while (arr.length) {
        _res = _res.concat(arr.shift())
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i].length && _res.push(arr[i].pop())
        }
        arr.length && (_res = _res.concat(arr.pop().reverse()))
        for (let j = arr.length - 1; j >= 0; j--) {
            _res.push(arr[j].shift())
        }
    }
    return _res
}
console.log(_con([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 'conconcon')
// 糖果最大
function big(arr, target) {
    let _res = []
    let max = Math.max.apply(this, arr)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] + target > max) {
            _res.push(arr[i])
        }
    }
    return _res
}
console.log(big([18, 5, 6], 7), 'bigibigbig')
// 回文串
function _chuan(str) {
    // '121' 3
    for (let i = 0; i < (str.length + 1) / 2; i++) {
        if (str[i] !== str[str.length - i - 1]) {
            return false
        }
    }
    return true
}
console.log('_chuan', _chuan('1211'))

// 循环深拷贝
function _clone1(tar) {
    let root = {}
    let loop = [{
        parent: root,
        key: undefined,
        data: tar
    }]
    while (loop.length) {
        let _node = loop.pop()
        let parent = _node.parent
        let key = _node.key
        let data = _node.data

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
}
// last
function _last1() {
    let _time = 0
    return () => {
        _time++
        let _new = _time
        setTimeout(() => {
            if (_new == _time) {
                console.log(2322222222, 'last111111')
            }
        }, 1000);
    }
}
let _p12 = _last1()
_p12()
_p12()
_p12()