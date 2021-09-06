// Symbol.iterator  表示实现迭代器API的函数
class Emitter {
    constructor(max){
        this.max = max
        this.idx = 0
    }
    *[Symbol.iterator](){
        while(this.idx < this.max){
            yield this.idx++
        }
    }
}

let f = new Emitter(4)

for(item of f){
    console.log('iterator----',item)
}


// Symbol.asyncIterator  表示实现异步迭代器的函数

class Emitter1 {
    constructor(max){
        this.max = max
        this.idx = 0
    }
    async *[Symbol.asyncIterator](){
        while(this.idx < this.max){
            yield new Promise(resolve=>resolve(this.idx++))
        }
    }
}

let f1 = new Emitter(4)
async function _C(){
    for await(item of f1){
        console.log('Symbol.asyncIterato----',item)
    }
}
_C()

// Symbol.isConcatSpreadable 指定concat是否打平
// 数组打平
let arr1 = [1,2,5,7]
let arr2  = [56,32]
let r = arr1.concat(arr2)
console.log('默认打平的concat',r)

// 不打平
let arr3 = [1,2,5,7]
let arr4  = [56,32]
arr4[Symbol.isConcatSpreadable] = false
let r1 = arr3.concat('不打平的concat',arr4)
console.log(r1)

let e = new WeakMap()
e.set({},'111')
console.log(e)

let rer = {
    d: {}
}
e.set(rer.d,'111')



// Symbol.unscopables 指用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。 
// 通俗一点就是使用with的是不让某个属性暴露出来

let _obj = {
    name:'renlingxin'
}
with(_obj){
    console.log('name------',name)
}

let _obj1 = {
    name:'renlingxin'
}
_obj1[Symbol.unscopables] = {
    name:true
}
with(_obj1){
    // console.log('name------',name)//name is not undefined
}


// Symbol.description  返回symbol的描述

console.log(Symbol('1').description)