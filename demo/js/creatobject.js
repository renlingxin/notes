/**
 *创建对象的方法  --- 1  object.create
 */
// 定义创建对象的-原型
let person = {
    isName:false,
    sayName:function(){
        console.log(this.name)
    }
}
//person是新创建对象的原型
let b= Object.create(person)

console.log(b.name = 'renlingxin')
console.log(b.isName)
console.log(b.__proto__)
/**
 *创建对象的方法  --- 2  字面量
*/
let _c = {}
console.log(_c)
_c.name = 'renlingxin'
console.log(_c)
/**
 *创建对象的方法  --- 3  构造函数
*/
let _v = new Object()
console.log(_v)
/**
 *创建对象的方法  --- 4  单例模式
*/
var able = {
    name:'renlingxin'
}
