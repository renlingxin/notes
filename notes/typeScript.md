### TypeScript

### 引言

> 什么是TypeScript？

TypeScript是[微软](https://baike.baidu.com/item/%E5%BE%AE%E8%BD%AF/124767)开发的一个开源的[编程语言](https://baike.baidu.com/item/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/9845131)，通过在[JavaScript](https://baike.baidu.com/item/JavaScript/321142)的基础上添加静态类型定义构建而成。TypeScript通过TypeScript[编译器](https://baike.baidu.com/item/%E7%BC%96%E8%AF%91%E5%99%A8/8853067)或Babel转译为JavaScript代码，可运行在任何[浏览器](https://baike.baidu.com/item/%E6%B5%8F%E8%A7%88%E5%99%A8/213911)，任何[操作系统](https://baike.baidu.com/item/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/192)。（来源百度百科）

​                                                                            


> TypeScript 有哪些优点？

* 类型 相较于JavaScript的动态类型，TypeScript 可选为静态类型，并且提供了强大的类型检查；这也使它更具表现力
*  ES6 TypeScript 提供了最新的和不断发展的 JavaScript 特性，包括ES6以及 未来的提案中的特性
*  对编辑器更加友好。可以为我们提供更好的如代码补全、类型验证等功能
*  面向对象的特性。 TypeScript 为我们提供了标准OOP功能 如类、接口、模块等
*  TypeScript 可以让 JavaScript 更好地与其他语言进行交互，甚至转换为其他语言；
*  强类型的引入能让我们在写代码的时候从值优先的思维转变成类型优先；

### 基础类型

> Number -- 数字

ts 中都是浮点数 除了支持 十进制和十六进制 字面量 还支持 ES6 引入的 二进制和八进制 字面量

```javascript
    let r: number = 6;
    let e: number = 0xf00d;
    let n: number = 0b1010;
    let l: number = 0o744;
```

> String  --字符串

```javascript
    let str: String = 'renlingxin'
```

> Null \ Undefined

```javascript

    let tar: null = null
    let unde : undefined = undefined

```

> Array -- 数组

两种书写方式

```javascript
    //1
    let arr: Number[] = [1, 3, 4]
    //2
    let arr1: Array<Number> = [3, 4]

```

> Tuple -- 元组

元组和数组类似。但元组类型要求属性和类型相对应

```ts

    let tulpeArr: [number, string] = [2, '333']

    let x: [number, string]
    x = [1, 'eee']

```
> Any -- 任意类型

any 类型是ts中的顶层类型。这代表它可以被指认为任意类型。因为这个类型不会存在类型检查。因为不建议使用

```javascript

    let _name: any = 2
    _name = 'dsdsd'

    let list: any = [1, 2, 3, '444']

```

> Object -- 对象

```javascript

    declare function create(o: object | null): void;

    create({ prop: 0 }); // OK
    create(null); // OK

```

> Never -- 不存在

 never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

```javascript

    // 返回 never 类型的函数必须包含无法到达的终点
    function putError():never{
        throw new Error('ddd')
    }
    function putError2():never{
        while(true){

        }
    }

```

> Enum -- 枚举

可用于常量枚举
```javascript

    enum people { ren, ling, xin }
    let _index: people = people.ren // 0

    enum person { ren = 2, ling = 5, xin = 9 }
    let _index1: person = person.ren // 2

    let str1: String = people[2] // 'ren'

```

> Void -- 没有任何类型

void 类型与 any 类型相反，它表示没有任何类型；any表示任意类型

```javascript

    // void 类型只能被 null 和 undefined 赋值
    function getVoid(): void {
        console.log('2222')
    }
    let _res: void = undefined
    _res = null


```
> Boolean

TypeScript 中的 boolean 是原始类型。 确保使用小写版本，并且不要引用 Boolean 的对象实例

```javascript
    let boo: boolean = false
    let boo1:boolean = true
    let boo2:Boolean = true  => 这样的话ts也可以正常编译 但是就是不规范别这么干
```
> Unknown 

Unknown 类型和any一样也是顶层类型，它可以接收任何类型，但它与 Any 的区别在于，它首次赋值后就确定了数据类型，不允许变量的数据类型进行二次变更。所以，在需要接收所有类型的场景下，优先考虑用 Unknown 代替 Any

###  类型断言 

**告诉 ts 这个类型我知道你别管**

```javascript
    // 1. <>

    let _time:any = '20200806'
    let _tiemLength:number = (<String>_time).length

    // 2. as

    let _time1:any = '20200806'
    let _tiemLength1:number = (_time as String).length

```


###  接口 interface

**interface  接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。**

1. 必须的属性验证

```typescript
    interface TYPE{
      color:String,
      area:Number
    }
    function getNum(tagetValue:TYPE){}
    getNum({color:'',area:1111}) //强制要求入参具备 color 和 area属性
```

2. 非必须的属性

```typescript
    interface TYPE{
      color?:String,// ? 
      area?:Number
    }
    function getNum(tagetValue:TYPE){}
    getNum({color:''})//不会强制校验 color 和 area 属性
```

3. 只读属性（ readonly指定只读属性 ）

```typescript
    interface TYPE{
      readonly color:String,
      readonly area:Number
    }
    let obj: TYPE =  {color : 'RED', area : 20}
    obj.X = 'SSS'  // ERROR
```
4. 多个属性和value简写

```typescript
interface NAMELIST {
  [key: number]: string;
}

```


###  泛型
**可复用性是优秀代码必不可少的特性之一。我们在书写TS代码中不仅会考虑支持现有类型的校验。也需要考虑支持动态的类型校验。那么我们可以通过泛型定义。**
1. 示例
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
2. 使用大写字母 A-Z 定义的类型变量都属于泛型

* T（Type）：表示一个 TypeScript 类型
* K（Key）：表示对象中的键类型
* V（Value）：表示对象中的值类型
* E（Element）：表示元素类型
* ......

### 类型保护 

**类型保护的意义在于前置。就是在报错前处理了它 **

1. typeof

```typescript

function getName(people:string){
  if(typeOf people === 'string'){
    console.log(1111)
  }
}
```

**typeof 的一个妙用**

```ts

  //可以通过typeof获取目标值的类型
  let res = {name:'eeeee'}
  type f = typeof res
  //type f = {
  //  name: string;
  //}
  
```

2. in 

```typescript
  interface OBJ {
    name:string
  }
  function getName(target:OBJ){
    if('name' in target){
      console.log(1111)
    }
  }
```

3. ts 语法 xxx is type 
```typescript

interface _params {
	data: string;
}
// 检测 request 对象包含参数符合要求的情况下，才返回 url
function validReqParams(p: unknown): p is _params {
	return p && p.data
}

```

### class中的修饰符

**我们知道ES6中的 class 是一个语法糖。是对寄生组合式继承方式的增强。在TypeScript中对class进行了再增强**

1. 修饰符

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。

* public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
* private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
* protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在**子类**中也是允许被访问的

```ts
//父类
class People {
  public age:number = 3
  private name:string = 'renlingxin'
  protected sex:string = 'nv'
}
//子类
class Ren extends People{
  constructor(){
    super()
  }
  getName(){
    console.log(this.age)//3 public 定义子类可以获取
    console.log(this.name)//private 定义的子类 无法获取
    console.log(this.sex)//protected 定义 子类可以获取 输出：nv
  }
}
//实例
let y = new People()
console.log(y.age)//age => 3
console.log(y.sex,y.name)
//private && protected 定义在实例中sex 和 name 都无法获取. 
//错误详情 => Property 'name' is private and only accessible within class 'People'.ts(2341)

```

2. get set (ES6)
我们可以在类中定义get 和 set 来拦截属性的改查行为

```ts
class People {
  // 同 object.defineProperty
  get time(){
    return '2020-1-2'
  }
  set time(val){
    console.log('setter',val)
  }
}
let p = new People()
p.time = '2021-4-4' //'setter', '2021-4-4'

console.log(p.time)// '2020-1-2'

```

3. static (ES6)
通过 static 定义的属性只能在class本身中使用。称之为‘静态属性’
```ts

class People {
  static name = 'renlingxin' 
}
let p = new People()
console.log(p.name,People.name) //static 定义的属性 能被父类直接调用 实例调不了

```



###  tips
1. delete ts 操作问题

```javascript
interface Thing {
  prop: string;
}

function f(x: Thing) {
  delete x.prop; //会报错  因为Thing定义中prop是必填项 删除不符合结构定义 接口的契约不会被破坏。
}
//改成这样
interface Thing {
  prop?: string;
}
```


2. push 操作

```javascript
const foo = (foo: string) => {
  const result = []
  result.push(foo)// [ts] Argument of type 'string' is not assignable to parameter of type 'never'.
}
//这是因为result内部默认类型是never

//改成这样
const result : string[] = [];
//或者这样
const result = [] as  any;
```

3. Form 表达操作报错
源于使用UI框架的表单验证方法validate
```javascript
this.$refs[formName].validate();//validate 会报错 Property 'validate' does //not exist on type 'Vue | Element | Vue[] | //Element[]'.Property'validate' does not exist on type 'Vue'.any


//改成这样  validate找不到类型，此时可以使用类型断言，将 validate 断言成：HTMLFormElement
(this.$refs[formName] as HTMLFormElement).validate();

```

4. ts - Vue中的 computed 
```ts
get val(){
  return '1'
}

//等价于

computed:{
  val(){
    reuturn '1'
  }
}
```
5. 联合类型

```ts
let t:number | undefined = '3'
```
6. 判断深层次数据属性是否存在可以使用  ?.

```ts
cosnt _age = res && res.data && res.data.age // JS
cosnt _age = res?.data?.age // TS

```

7. TypeScript

ts中内置了DOM各种元素的声明

```ts

HTMLElementTagNameMap  => ts中DOM类型定义的集合

常见的类型定义：
1. HTMLFormElement   => form
2. HTMLHeadingElement => h1
3. HTMLImageElement => img
4. ...
```



