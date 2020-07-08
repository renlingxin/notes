// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>常见的正则练习</title>
// </head>

// <body>

// </body>
// {
    /* <!-- <script>
        let obj = {
            name: 'renlingxin'
        }
        let name = obj.name
        let age = 12
        Object.defineProperty(obj, 'age', {
            enumerable: true,
            get() {
                return age
            },
            set(newVal) {
                if (newVal !== age) {
                    age = newVal
                }
            }
        })
        obj.age = 111111
        console.log('obj.age:', obj.age)
        Object.defineProperty(obj, 'name', {
            enumerable: false,
            configurable: false,
            get() {
                return name
            },
            set(newVal) {
                if (newVal !== name) {
                    name = newVal
                }
            }
        })
        // getOwnPropertyDescriptors  es6新增  查看自有属性默认值
        console.log(Object.getOwnPropertyDescriptors(obj))
        // configurable 为false时 属性不能被删除
        delete obj.name
        console.log('obj.name:', obj.name)
        // enumerable 为false时 属性不能被枚举
        console.log('Object.keys:', Object.keys(obj))
        for(item in obj){
            console.log('for...in:', item)
        }
    </script> -->
    <script> */
// }
// 简单
console.log('----------------连续出现n个以上数字---------------------')
let reg = /\d{3}/g
console.log(reg.test('1234ddd'))
console.log(reg.test('12dd3'))
console.log('----------------连续出现n个以上任意字符---------------------')
let reg1 = /.{5}/
console.log(reg1.test('dddd'))
console.log(reg1.test('ddddddddd'))
console.log('----------------连续出现n个以上字母---------------------')
let reg2 = /[a-z]{5}/
console.log(reg2.test('11111'))
console.log(reg2.test('ddddddddd'))
console.log('----------------? 连续出现0-1个字母---------------------')
let reg3 = /[a-z]?/
console.log(reg3.test('11111'))
console.log(reg3.test('ddddddddd'))
console.log('----------------* 连续出现0-到多次字母---------------------')
let reg4 = /[a-z]*/
console.log(reg4.test('11111'))
console.log(reg4.test('ddddddddd'))
console.log('----------------+ 连续出现1到多次字母---------------------')
let reg5 = /[a-z]+/
console.log(reg5.test('11111'))
console.log(reg5.test('ddddddddd'))
console.log('----------------^ 以字母开头 或 数字开头---------------------')
let reg6 = /^[a-z | \d]+/
console.log(reg6.test('11111'))
console.log(reg6.test('。1212ddddddddd'))
console.log('----------------小数---------------------')
let reg7 = /\d+\.\d+/
console.log(reg7.test('11111'))
console.log(reg7.test('12.22'))
console.log('----------------\s 空格---------------------')
let reg8 = /\s/
console.log(reg8.test('1 1111'))
console.log(reg8.test('12.22'))
console.log('------------------边界符-------------------')
let reg9 = /\b\w+\b/g
console.log(reg9.exec('aa bb cc'))
console.log(reg9.exec('aa bb cc'))
console.log(reg9.exec('aa bb cc'))
console.log('------------------$以某个元字符结尾-------------------')
let reg10 = /1$/g
console.log(reg10.test('aa bb cc'))
console.log(reg10.test('aa bb 111'))
console.log('------------------正整数验证-------------------')
let reg11 = /^[0-9]*[1-9][0-9]*$/g
console.log(reg11.test(111111))
console.log(reg11.test(342424234 - 4))
// </script>
// <script>
// 复杂
console.log('----------------包含数字字母下划线8位--密码匹配---------------------')
let diffreg = /^[a-zA-Z]\w{8}/
console.log(diffreg.test('wdfdfdfwdf12_'))

console.log('----------------18位或15位18位x结尾--身份证---------------------')
let diffreg1 = /(^\d{18}$)|(^\d{15}$)|(\d{17}(\d|x|X)$)/g
console.log(diffreg1.test('111111111111111111x'))

console.log('----------------13位--手机号---------------------')
// let diffreg2 = /^[0-9]{3}(-)?([0-9]{10})$/
let diffreg2 = /^1[3|8][0-9]\d{4,8}$/
console.log(diffreg2.test('13011111111'))


console.log('----------------是否是https开头---------------------')
let diffreg3 = /^https/
console.log(diffreg3.test('https13011111111'))


console.log('----------------cxc---------------------')
let diffreg4 = /^[0-9](\d\，+)|(\d\,+)[0-9]*$/
console.log(diffreg4.test('2222'))
// </script>
// </html>