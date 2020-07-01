/**
 *对象方法  --- 1  object.create
 */
// 定义创建对象的-原型
let person = {
    isName: false,
    sayName: function () {
        console.log(this.name)
    }
}
//person是新创建对象的原型
let b = Object.create(person)

console.log(b.name = 'renlingxin')
console.log(b.isName)
console.log(b.__proto__)
console.log('--------------------------------')

/**
 *对象方法  --- 2  object.assign
 *将源对象中可枚举的值 复制到目标对象中
 *例：_a是目标对象   _b 是源对象
 */
let _a = {
    a: null,
    b: null,
    c: null
}
let _b = {
    a: 23
}
Object.assign(_a, _b)
console.log(_a, _b)
console.log('--------------------------------')

/**
 *对象方法  --- 2  object.getOwnPropertyDescriptors|getOwnPropertyDescriptor
 *获取对象上自有属性的属性描述符
 */
let _des = {
    a: 'renlingxin'
}
console.log(Object.getOwnPropertyDescriptors(_des))
console.log(Object.getOwnPropertyDescriptor(_des, 'a'))
console.log('--------------------------------')

/**
 *对象方法  --- 3  object.defineProperties
 *更改对象中元素的默认属性值
 */
let _de = {
    a: 'renlingxin'
}
console.log(Object.getOwnPropertyDescriptors(_de))
Object.defineProperties(_de, {
    'a': {
        configurable: false
    }
})
console.log(Object.getOwnPropertyDescriptor(_de, 'a'))
console.log('--------------------------------')

/**
 *对象方法  --- 4  object.defineproperty
 * 默认属性值：
 * value -> 该属性对应的值
 * writable -> 属性的值是否可以被更改
 * enumerable -> 属性是否可以被for ...in 和 object.keys枚举
 * configurable -> 属性是否可以被删除
 */
let _t = {
    name: ''
}
let temp;
// 修改name的值 和默认属性
Object.defineProperty(_t, 'name', {
    value: 'xxxxxx',
    writable: false
})
console.log(Object.getOwnPropertyDescriptor(_t, 'name'))
_t.name = 23
// getter setter 方法
Object.defineProperty(_t, 'name', {
    configurable: false,
    set: function (val) {
        temp = val
    },
    get: function () {
        return temp
    }
})
_t.name = 'renlingxin'
console.log(Object.getOwnPropertyDescriptors(_t))
console.log('--------------------------------')

/**
 *对象方法  --- 5  object.entries - object.fromEntries
 * object.entries返回给定对象可枚举属性的 键值对数组 
 * object.entries与for... in循环遍历返回的顺利相同，区别在于for...in会遍历原型链中的属性
 * object.fromEntries把键值对列表转换为一个对象
 */
let _n = {
    name: 'ren',
    age: 2
}
Object.defineProperties(_n, {
    'name': {
        configurable: false
    },
})
console.log(Object.getOwnPropertyDescriptors(_n))
console.log(Object.entries(_n))
let _ns = Object.entries(_n)
console.log(Object.fromEntries(_ns))
console.log('--------------------------------')

/**
 *对象方法  --- 6  object.keys  object.values
 * 返回给定对象可枚举属性 组成的数组
 */
console.log(Object.keys(_n))
console.log('object.values:', Object.values(_n))
console.log('--------------------------------')

/**
 *对象方法  --- 7  object.freeze
 * 冻结对象  被冻结的对象自身属性都不能被修改 
 */
let _w = {
    name: 'dssds'
}
Object.freeze(_w)
_w.name = '1111'
console.log(_w)
console.log(Object.getOwnPropertyDescriptors(_w))
console.log('--------------------------------')

/**
 *对象方法  --- 8  object.getPrototypeOf
 * 返回给定对象的原型
 */
let _v = {
    name: '222'
}
let _new = Object.create(_v)
console.log('Object.getPrototypeOf:', Object.getPrototypeOf(_new))
console.log('--------------------------------')
/**
 *对象方法  --- 9  object.is
 * 判断两个值是否是相同的值
 */
let _o1 = {
    t: 'woshi'
}
let _o2 = {
    t: 'woshi'
}
console.log('Object.is:', Object.is(_o1.t, _o2.t))
console.log('--------------------------------')
/**
 *对象方法  --- 10  object.isExtensible
 * 判断一个对象是否是可扩展的
 */
let _g = {
    name: 'ddd'
}
Object.freeze(_g)
console.log(Object.isExtensible(_g))
console.log('--------------------------------')

