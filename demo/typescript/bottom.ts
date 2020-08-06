
// 基本数据类型

    // 1. 数组 Array

    let arr: Number[] = [1, 3, 4]

    let arr1: Array<Number> = [3, 4]

    // 2. 元组 Tulpe

    let tulpeArr: [number, string] = [2, '333']

    let x: [number, string]
    x = [1, 'eee']

    // 3. 字符串 String

    let str: String = 'renlingxin'

    // 4. null / undefined

    let tar: null = null
    let unde : undefined = undefined

    // 5. 没有任何类型 void
    // void 类型只能被 null 和 undefined 赋值

    function getVoid(): void {
        console.log('2222')
    }
    let _res: void = undefined
    _res = null


    // 6. 永不存在的值的类型 never
    // never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

    // 返回 never 类型的函数必须包含无法到达的终点
    function putError():never{
        throw new Error('ddd')
    }
    function putError2():never{
        while(true){

        }
    }


    // 7. 数字 number
    // ts 中都是浮点数 除了支持 十进制和十六进制 字面量 还支持 ES6 引入的 二进制和八进制 字面量

    let decLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;
    let octalLiteral: number = 0o744;



    // 8. 任意 any

    let _name: any = 2
    _name = 'dsdsd'

    let list: any = [1, 2, 3, '444']

    // 9. 枚举 enum

    enum people { ren, ling, xin }
    let _index: people = people.ren // 0

    enum person { ren = 2, ling = 5, xin = 9 }
    let _index1: person = person.ren // 2


    let str1: String = people[2] // 'ren'

    // 10 对象 object

    declare function create(o: object | null): void;

    create({ prop: 0 }); // OK
    create(null); // OK



    // 11 布尔 Boolean

    let boo: Boolean = false
    let boo1:Boolean = true


// 类型断言  => 告诉 ts ‘这个类型我知道你别管’

    // 1. <>

    let _time:any = '20200806'
    let _tiemLength:number = (<String>_time).length

    // 2. as

    let _time1:any = '20200806'
    let _tiemLength1:number = (_time as String).length




// interface 类型检查

    // 1 强制检查

    interface checkType {
        width: String,
        area: Number
    }
    function getNum(target: checkType) {
        console.log(target)
    }
    getNum({ width: '333', area: 222 })

    // 2 可选属性

    interface checkTypes {
        width?: String,
        area?: Number
    }
    function getNums(target: checkTypes) {
        console.log(target)
    }
    getNums({ width: '333' })

    // 3 只读属性

    interface checkType1 {
        readonly width: String,
        readonly area: Number
    }
    function getNum1(target: checkType1) {
        target.width = 'ddd'
    }
    getNum1({ width: '333', area: 222 })

    // point 
    // let _obj: Point = { name: 'renlingxin' }
    // _obj.name = 'ddd'