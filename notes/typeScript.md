### TypeScript

### 资料
掘金 => https://juejin.cn/post/6914442673155735560

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

TypeScript 中的 boolean 是原始类型。 确保使用小写版本，并且不要引用 Boolean 的对象实例

```javascript
    let boo: boolean = false
    let boo1:boolean = true
    let boo2:Boolean = true  => 这样的话ts也可以正常编译 但是就是不规范别这么干
```
12. Unknown 
Unknown 类型和any一样也是顶层类型，它可以接收任何类型，但它与 Any 的区别在于，它首次赋值后就确定了数据类型，不允许变量的数据类型进行二次变更。所以，在需要接收所有类型的场景下，优先考虑用 Unknown 代替 Any

### 类型断言  => 告诉 ts ‘这个类型我知道你别管’

```javascript

    // 1. <>

    let _time:any = '20200806'
    let _tiemLength:number = (<String>_time).length

    // 2. as

    let _time1:any = '20200806'
    let _tiemLength1:number = (_time as String).length

```


### 接口 --- interface  接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

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
####  readonly 和 const

readonly  用于属性的指定   const 用于定义变量

###  declare --- 声明文件就是给js代码补充类型标注. 这样在ts编译环境下就不会提示js文件"缺少类型".

```javascript

declare var __DEV__: boolean
declare var __COMMIT__: string

```


### 泛型
工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。是否支持多种数据类型就是其指标之一。我们定一个 temp 函数，返回其输入。

```typescript

  // 我们不知其类型
  function temp (s) {
      return s;
  }
  // 我们不能保证其输出类型与输入一致
  function temp (s: any): any {
      return s;
  }
  // 利用泛型限定类型必须一致
  function temp<T> (s: T): T {
      return s;
  }

```

### 类型保护 就是在报错前处理了它 
1. typeof
2. in 
3. instanceof 实例判断
4. ts 语法 xxx is type 
```typescript

interface _params {
	data: string;
}
// 检测 request 对象包含参数符合要求的情况下，才返回 url
function validReqParams(p: unknown): p is _params {
	return p && p.data
}

```

###  修饰符

修饰符 public、 private 和 protected和区别

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。

public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的







