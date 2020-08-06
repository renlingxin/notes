### TypeScript
* 强类型的引入能让我们在写代码的时候从值优先的思维转变成类型优先；
* 强类型的引入能帮助开发工具（IDE 等）更好地为开发者提供便利性能力，如智能补全、类型检测、编译时检查等等；
* TypeScript 可以让 JavaScript 更好地与其他语言进行交互，甚至转换为其他语言；

### 基础类型
1. Number -- 数字

```javascript

    // ts 中都是浮点数 除了支持 十进制和十六进制 字面量 还支持 ES6 引入的 二进制和八进制 字面量

    let decLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;
    let octalLiteral: number = 0o744;

```

2. String  --字符串

```javascript

    let str: String = 'renlingxin'

```

3. Null \ Undefined

```javascript

    let tar: null = null
    let unde : undefined = undefined

```

4. Array -- 数组

```javascript

    let arr: Number[] = [1, 3, 4]

    let arr1: Array<Number> = [3, 4]

```

5. Tuple -- 元组

```javascript

    let tulpeArr: [number, string] = [2, '333']

    let x: [number, string]
    x = [1, 'eee']

```
6. Any -- 任意

```javascript

    let _name: any = 2
    _name = 'dsdsd'

    let list: any = [1, 2, 3, '444']

```

7. Object -- 对象

```javascript

    declare function create(o: object | null): void;

    create({ prop: 0 }); // OK
    create(null); // OK

```

8. Never -- 不存在

```javascript

    // never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

    // 返回 never 类型的函数必须包含无法到达的终点
    function putError():never{
        throw new Error('ddd')
    }
    function putError2():never{
        while(true){

        }
    }

```

9. Enum -- 枚举

```javascript

    enum people { ren, ling, xin }
    let _index: people = people.ren // 0

    enum person { ren = 2, ling = 5, xin = 9 }
    let _index1: person = person.ren // 2


    let str1: String = people[2] // 'ren'

```

10. Void -- 没有任何类型

```javascript

    // void 类型只能被 null 和 undefined 赋值
    
    function getVoid(): void {
        console.log('2222')
    }
    let _res: void = undefined
    _res = null


```
11. Boolean

```javascript

    let boo: Boolean = false
    let boo1:Boolean = true
    
```

### 接口 --- interface 

1. 必须的属性验证

```typescript
    interface typeCheck{
      color:String,
      area:Number
    }
    function getNum(tagetValue:typeCheck){
    
    }
    getNum({color:'',area:1111})
```

2. 非必须的属性

```typescript
    //非必须的属性
    interface typeCheck{
      color?:String,
      area?:Number
    }
    function getNum(tagetValue:typeCheck){
    
    }
    getNum({color:'',area:1111})
```

3. 只读属性（ readonly指定只读属性 ）

```typescript
    interface typeCheck{
      readonly color:String,
      readonly area:Number
    }
    function getNum(tagetValue:typeCheck){
    
    }
    getNum({color:'',area:1111})
let obj: Point =  {X : 10, Y : 20}
OBJ.X = 'SSS'  // ERROR
```
**补充** readonly 和 const

readonly  用于属性的指定   const 用于定义变量