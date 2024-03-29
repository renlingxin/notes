### JAVAScript 


### TypeScript 
* 强类型的引入能让我们在写代码的时候从值优先的思维转变成类型优先；
* 强类型的引入能帮助开发工具（IDE 等）更好地为开发者提供便利性能力，如智能补全、类型检测、编译时检查等等；
* TypeScript 可以让 JavaScript 更好地与其他语言进行交互，甚至转换为其他语言；



### 元编程
概念 => 对编程语言进行编程
背景 => es6之前没有提供太多的元编程能力
实例 => proxy

### 数组去重
资料：https://segmentfault.com/a/1190000016418021
1. Set

```javascript
[...new Set(arr)]
Array.from(new Set(arr))
```
2. indexof
```javascript
//1. indexOf
function n(arr){
  let res = []
  for(let i=0;i<arr.length;i++){
    //if(!res.includes(arr[i])){
      //res.push(arr[i])
    //}
    if(res.indexOf(arr[i]) !== -1){
      res.push(arr[i])
    }
  }
  return res
}
//2. indexOf and filter
let res = arr.filter((e,i)=>{
  return arr.indexOf(e) === index
})


```
3. 双层递归操作

```javascript
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
```
### 数组 对象深拷贝

##### es6剩余运算符  -- 浅拷贝

```javascript
let numList = [1,4,23,{name:'renlingxin'}];
let news = [...numList];

let objs = {name:'jingchan',age:23};   
let newObj = {...objs};
```

##### JSON

```javascript
let timeList = [12,5,34,4,{name:'admin'}];
let news = JSON.parse(JSON.stringify(timeList));
```
** 缺点

1. undefined

```javascript
let s = {r:undefined}
//undefined
JSON.parse(JSON.stringify(s))
//{}

```

2. 函数

```javascript

let t = {u:function(){}}
//undefined
//t
//{u: ƒ}
JSON.parse(JSON.stringify(t))
//{}

```

##### 递归方法

```javascript
let thingList = [2.3,1,111,334,{name:'renlingxin'}];
function clone(data){
let res = data.constructor === 'Array' ? [] : {};
 for(let i=0;i<data.length;i++){
   if(data.hasOwnproperty(data[i])){
     res[i] = typeof data[i] === 'object' ? : clone(data[i]) : data[i];
   }
 }
 return res;
}
clone(thingList);
```

### 一键复制

##### document.execCommand()
当一个HTML文档切换到设计模式时，document暴露execCommand方法，该方法允许运行命令来操纵**可编辑内容区域**
```javascript
let btn = document.getElementById('btn');
btn.select();
document.execCommand('copy');
```
##### vue-clipboard2
插件一键复制
```javascript
this.$copyText(data).then(()=>{
       
})
.catch(console.log);
```

### escape 和 unescape

escape()函数可以对字符串进行编码，这样就可以在所有的计算机上读取改字符串
unescape()可以对escape()编码的数据进行解码

### charCodeAt() 和 fromCharCode()

charCodeAt() 方法可返回指定位置的字符的Unicode编码，这个返回值时0-65535之间的整数
fromCharCode()方法可以将Unicode编码转换成字符

### javascript中的基本类型(七种)以及引用数据类型

>MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#BigInt_type

**基本数据类型**
Number    string    null   undefined   boolean      BigInt  symbol

##### BigInt
BigInt数据类型的目的是比Number数据类型支持的范围更大的整数值。在对大整数执行数学运算的时候，以任意精度表示整数的能力尤为重要。使用BigInt#整数溢出#将不在是问题。
JS 中的Number类型只能Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER之间的整数。任何超出此范围的整数值都可能失去精度。
**定义 1 要创建bigint，只需在整数的末尾加上n 2 使用构造函数**
```javascript
console.log(10n)
BigInt(10); // 10n
```
**因为隐式转换可能丢失信息，所以不允许在bigint和number之间尽心混合操作**
```javascript
10 + 10n;   //TypeError
Math.max(2n,4n,6n);  // TypeError
```
**关系运算符不遵循这个规则**
```javascript
10n > 5;  //true
```
**如果一定要执行两者之间的算术计算**
```javascript
BigInt(10) + 10n;  //20n
10 + Number(10n);  //20
```
##### symbol 定义一个唯一的值
```javascript
let a = symbol('这是唯一的')； //定义一个唯一的值 , 括号里是对他的描述
typeof a; //symbol
```
**引用数据类型**
1 对象object(包含普通对象，数组对象array，正则对象RegExp，日期对象Date，数学函数Math)
2 函数Function


### null 和 undefined
###### undefined （未定义的值）
* 声明一个变量，但是没有赋值
```javascript
  var a;
  a === undefined  //true
```
* 访问对象上不存在的属性或者未定义的变量
* 函数定义了形参，但没有传递实参
* 使用void对表达式求值
```javascript
void 0 ; // undefined
void false; // undefined
void []; // undefined
```
###### null   （空对象指针）
从逻辑角度上看，null值表示一个**空对象指针**;在内存里的表示就是，栈中的变量没有指向堆中的内存对象。
```javascript
//注意：typeof是一个操作符而不是函数 因此不用强制使用typeof()
typeof null;  //'object'
```
**实际上undefined就是派生自null值的**
```javascript
null === undefined  //false
null == undefined   //true
```
**null 是对象吗？？**
```javascript
typeof(null);   //'object'  这是js中历史悠久分bug,在js最初的版本中使用的都是32位版本系统，为了性能考虑使用低位存储的类型信息，000开头代表的是对象然而null表示位全0，所以将它错误的判断为object
```

### valueOf()方法

valueOf方法一般不用我们自己手动调用，当遇到期望有原始值的对象时，JavaScript会自动调用它
返回值：返回给定Symbol对象的原始值
```javascript
    //boolean
    let shoe = symbol('这是一个唯一的值');
    shoe.valueOf();  //输出；symbol('这是一个唯一的值');
    //Date时间格式
    let time = new Date();
    time.valueOf();  //举例输出：1571207102659
    //string
    let str = 'renlingxin';
    str.valueOf();   //输出'renlingxin'

```

### 函数形参赋值
ECMAscript中的所有函数都是**按值传递**的，也就是说，把函数外部的值复制给函数内部的参数。，就和把一个变量**复制**到另一个变量一样
#### 基本类型
```javascript
function addTime(num){
    num++;
    return num;
}
let count = 10;
let result = addTime(count);   
console.log(result); // 11
console.log(num); // 10
```
基本类型的形参赋值。参数num是函数中的局部变量，函数调用中变量count作为参数被传递给这个函数，count的值10也被复制给局部变量num以便在函数addTime中使用。函数执行中，num的值++，这一变化并不会影响外部变量count变量。参数num和count相互之间并不认识他们只是具备相同的值。
#### 引用类型
```javascript
let obj = {name:'renlingxin'};
function addClass(item){
   item.name = 'tepulang';
   return item;
}
addClass(obj);
console.log(obj.name);  //'tepulang'
```
引用类型的形参赋值。变量obj作为参数传递给函数addClass，在形参赋值过程中，obj的内容被复制给item,但同时他们访问的还是同一个内存地址。与基本类型的不同之处在于，引用类型的按值传递就是将引用地址复制给形参item,因此item.name会影响外部变量obj的值；
```javascript
let bom = {age:32};
function delet(item){
  item.age = 33;
  item = new Object();
  item.age = 0;
}
delet(bom);
console.log(bom.age); //33
```
这段代码与前一个例子的区别就在于，在对item进行形参赋值之后，并进行了响应的操作之后。又赋给item新的内存地址；然而外部变量bom并没有受到函数内新内存地址操作的影响；我们可以得出结论，在形参赋值之后item所访问的内存地址就被凝固了。更一步验证了函数的参数是按值操作。

### 类型检测

#### typeof操作符
```javascript
let one = '';
let two = 32;
let three = null;
let thour = undefined;
let five = Symbol('');
let six = true;
let seven = new Object();
typeof(one); // string
typeof(two); // number
typeof(three); //object
typeof(thour); // undefined
typeof(five); //Symbol
typeof(six); //Boolean
typeof(seven); //object
```
**typeof 用于检测大部分基本类型值也就是 string number undefined Boolean Symbol 
如果检测的对象是null 和 object 返回非将是object**
#### instanceof操作符
```javascript
let a = {};
let b = [];
let c = /[0-9]/;
let d = function cat(){};
a instanceof Object;  // true
b instanceof Array; //true
c instanceof RegExp; //true
d instanceof Function；// true
d instanceof Object; //true
```
**ECMAscript为我们提供了instanceof操作符，它是通过验证变量是否属于给定引用类型的实例来判断该变量是哪种类型;返回值是true和false**
#### constructor(偏方)
```javascript
let a = {};
let b = [];
let c = /[0-9]/;
let d = function cat(){};
let one = '';
let two = 32;
let three = null;
let thour = undefined;
let five = Symbol('');
let six = true;
a.constructor    // ƒ Object() { [native code] }
a.constructor === Object // true
one.constructor  //ƒ String() { [native code] }
one.constructor === String // true
```
**construtor属性用于返回创建该对象的函数，也就是我们常说的构造函数。**
#### Object.prototype.toString.call()
```javascript
let one = '';
let d = function cat(){};
Object.prototype.toString.call(one) //"[object String]"
Object.prototype.toString.call(d) //"[object Function]"
```
### 数组toString() 和 toLocaleString()方法
###### 在js中所有的对象都具有toLocaleString(),toString(),valueOf方法
```javascript
let num = 123;
num.toLocaleString();   //'123'
num.toString();    //'123'

let lotNum = 1234567;
lotNum.toLocaleString();   //'123,456,7'
lotNum.toString();    //'1234567'
```
当数字是三位以上的时候，会每三位出现一个分隔符；
```javascript
let a = [1,2,3];
a.toLocaleString();   //'1,2,3'
a.toString(); //'1,2,3'
```
是数组时，两种方法的结果没有区别
```javascript
let time = new Date();
time.toLocaleString();   //"2019/10/21 下午2:35:58"
time.toString();      //"Mon Oct 21 2019 14:35:58 GMT+0800 (中国标准时间)"
```
**两者的主要区别还体现在时间类型的转换上**

##### 结论
1 toLocaleString() 会根据你机器的本地环境来返回字符串，它和toString()返回的值在不同的环境下使用的符号可能变化
2 使用toString()方法是保险的方法，他不会因为本地环境（例如国家）改变而改变；
3 为了返回时间类型的值，使用toLocaleString();

###   e 表示法
```javascript
let a = 123e3;
a; //123000  === 123 * 10的三次方
let b = 123e-3;
b; //0.123 === 123 * 10的负三次方
```
**用e表示法表示的数组等于e前面的数值乘以10的指数次幂。即前面是一个数值，中间是一个大写或者小写的e，后面是10的指数次幂中的指数**
### Array.reverse()
reverse()方法用于颠倒数组中元素的顺序
```javascript
let num = [1,3,4,4];
num.reverse(); // [4,4,3,1]
```
#######  字符串反转
```javascript
let name = 'renlingxin';
name.split().reverse().join();   //'nixgnilner'
```
### 无限循环
```javascript
for( ; ; ){ doSomeThing() }
```

### object.keys  和 reflect.ownkeys
```javascript
let  num = [12,23,34];
Object.keys(num);    //['0','1','2']
Reflect.ownKeys(num);  //['0','1','2','length']
let obj = {name:'renlingxin'};
Object.keys(obj);    //['name']
Reflect.ownKeys(obj);  //['name']
//从结果上看Object.keys返回属性key,但不包括可以枚举的属性
//Reflect.ownKeys 返回所有属性key
```
### 函数
**函数是对象，函数名是指针**
函数的属性和方法有 length 和 prototype 

```javascript
function add(name,age){};
add.length;   //输出一个函数希望接收的命名参数的个数
```
#### 函数内部属性 arguments 和 this
```javascript
let name = '任岭鑫';
let obj = {name:'黑猫警长'};
function say(){
   console.log(this.name)
}
say();  //任岭鑫   函数在全局作用域 调用时 this指向window
obj.say = say;
obj.say();   //黑猫警长   函数被obj调用 因此this指向obj
```
##### arguments
###### arguments用来保存函数参数 他是一个类数组
```javascript
function cat(name,age){
   //arguments是一个类数组 其中包含length属性
   console.log(arguments); 
   //arguments中的改变会映射到外部参数
   arguments.name = '狗屎☁️';
   console.log(name);
}
cat('任岭鑫'，23);
```
###### arguments.callee
```javascript
//arguments.callee 指向拥有该arguments的函数
function add(){console.log(arguments.callee)};
add();
//使用
   function cat(num) {
        if (num <= 5) {
            return 5;
        } else {
            return num * cat(num - 1);
        }
    }
    let res = cat(10);
    console.log(res)
    //上述代码中函数的执行与函数名紧紧耦合到了一起，为了消除这种耦合现象 上述递归可以     改写为以下代码来保证递归的正常运行
    function bech(num) {
        if (num <= 5) {
            return 5;
        } else {
            return num * arguments.callee(num - 1);
        }
    }
    let result = bech(10);
    console.log(result)
```
###### arguments.caller（）
```javascript
    function one11() {
        inner();
    }
    function inner() {
        console.log(inner.caller);
        // 函数caller属性等价与arguments.callee.caller  
        console.log(arguments.callee.caller)
    }
    // 如果在全局中调用该函数 那么结果为null
    // inner();
    one11();
```
###### 函数内部属性this
this引用的是函数执行的环境对象
```javascript
var name = 'renlingxin';
function add(){
   console.log(this.name) //函数执行环境是全局，因此this指向 window 
}
add();
```
##### 函数属性与方法：每个函数包含两个属性length和prototype 
```javascript
function add(num1,num2){}
add.length;  //legth属性表示函数希望接受的命名参数的个数
```
**prototy是不可枚举的，因此for-in也无法发现**

##### 包含两个非继承而来的方法 apply 和 call
这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内的this对象的值。
apply接收两个参数，一个是在其中运行的函数的作用域，另一个是参数数组。其中第二个参数可以是Array的实例，也可以是argument对象
```javascript
function o(name){this.name=name};
function add(){
  var name = 'heimao'
  o.apply(this,['renlingxin']);  //函数o执行的时候 作用域都在this当前作用域 也就是add作用域  那么在o中的this操作其实都是对add的操作
  console.log(this.name)
}
add();
```
**call() 和 apply() 方法作用相同，他们的区别仅在于接收参数的方式不同**
```javascript
function add(){
  console.log(this.one,this.two)
}
let o = {
  one:1,
  two:2
}
add.call(o);  //1,2 通过call方法将add函数执行的作用域指向o
```
```javascript
function fn1(){console.log('fn1-------',this)};
function fn2(){console.log('fn2-------',this)};
fn1.call(fn2); // fn1--------- ƒ fn2(){console.log('fn2---------',this)}
fn1.call.call(fn2) //fn2--------- Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
```
### String
1. 	字符方法 charAt()  和  charCodeAt()
```javascript
var o = 'renlingxin';
o.charAt(1); //e  返回给定位置的字符
o.charCodeAt(1); //101 返回给定位置字符编码
```
2. 字符串操作方法 
**concat()**
```javascript
var e = 'ren';
e.concat('ling');  //"renling"  字符串拼接
```
**slice()**  **substr()**   **substring()** 
```javascript
var name = 'renlingxin';
name.slice(3); //"lingxin" 不设置默认值的时候返回3到末尾
name.substr(3); //"lingxin" 不设置默认值的时候返回3到末尾
name.substring(3); //"lingxin" 不设置默认值的时候返回3到末尾
name.slice(3,7); //"ling" 返回位置3到位置7但是不包括位置7
name.substring(3,7);//"ling" 返回位置3到位置7但是不包括位置7
name.substr(3,7);  //"lingxin"返回位置3之后的7个字符
```
3. 字符串位置方法 indexOf() lastIndexOf()
```javascript
var name =  'hello world';
name.indexOf('o'); //4
name.lastIndexOf('o'); //7
```
4. trim() 方法
```javascript
var name = '    renlingxin.  ';
name.trim(); //"renlingxin."  会创建一个字符串的副本，删除前置空格以及后缀的所有空格，然后返回结果
```
5. 字符串大小写转换方法
```javascript
toUpperCase();   //转大写
toLowerCase();   //转小写
toLocaleLowerCase(); //转大写（针对特定地区）
toLocaleUpperCase();//转小写（针对特定地区）
```
6. 字符串模式匹配方法
```javascript
var name = 'renlingxin';
var pattern = /ren/;
name.match(pattern); // ["ren", index: 0, input: "renlingxin", groups: undefined] 返回一个数组
name.search(pattern); //0 返回字符串中第一个匹配项的索引
name.replace('ren',111); //"111lingxin" 不改变原数组
name.split();//["renlingxin"]
var one = 'one,two,three';
one.split(',',2);// ["one", "two"]
```
7. replace 方法扩展     replaceAll   替换全部
 ECMAScript v3 规定，replace() 方法的参数 replacement 可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。
```javascript
var f = 'ddd{{perso}}ddd'
f.replace(/\{\{(.+?)\}\}/g,(...args)=>{
      console.log(args) //[ "{{perso}}", "perso", 3, "ddd{{perso}}ddd" ]
})
name = 'aaa bbb ccc';
uw=name.replace(/\b\w+\b/g, function(word){
  return word.substring(0,1).toUpperCase()+word.substring(1);
});
```
*其他示例*
$1、$2、...、$99 	与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。

```javascript
//字母颠倒
name = "Doe, John";
name.replace(/(\w+)\s*, \s*(\w+)/, "$1 $2");
```

### Math

1. Math.abs()  ==> 返回绝对值

2. Math.sqrt() ==> 返回平方根

3. Math.min(a,b) ==> 返回a,b中的最小值

4. Math.max(a,b) ==>返回a,b中的最大值

```javascript

    //求数组中的最大值和最小值
    let num  = [1,2,56,4,3,2];  
    Math.max.apply(this,num) //56
    Math.min.apply(this,num) //1
    Math.max(...num)
    Math.min(...num)
    
```

5. Math.pow(x,y) => 返回x的y次幂的值


```javascript

    Math.pow(2,4) => 16
    
```
6. Math.random 随机0<=n<1的数字
```javascript

    Math.random()*10   //获取0 <=n < 10之间的数
    Math.random()*10+1  //获取1 <= n < 10之间的数

```

7. Math.floor()向下取整
```javascript

    Math.floor(1.8) //1
    
```

```javascript

    //随机生成十二位 字符串
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return `${s4()}${s4()}${s4()}`;
    }

```

8. Math.ceil()向上取整

```javascript

    Math.ceil(1.2) //2
    
```

9. 生成n-m的随机整数

```javascript
    //向下取整   n <= x < m-n+1 + n
    Math.floor(Math.random() * (m-n+1) + n)
    // 四舍五入  n <= x < m-n+n
    Math.round(Math.random() * (m-n) + n)
    //向上取整   n-1 <= x < m-n + n-1
    Math.ceil(Math.random() * (m-n) + n-1 )
    
```

### 自执行函数
1. 正规的自执行函数
```javascript
(function(){

}())
(function(){

})()
````
2. &&  ||  ,
```javascript
true && function(){console.log('true')}()
false || function(){console.log('false')}()
0,function(){console.log('0,')}
```
3. !   ~   -   +
```javascript
!function(){console.log('!')}
~function(){console.log('~')}
+function(){console.log('+')}
-function(){console.log('-')}
```
4. new 
```javascript
new function(){console.log('new')}
new function(a){console.log(a)}('renlingxin')
```
5. 赋值
```javascript
let i = function(a){console.log(a)}('ddd')
```
#### 自执行函数的应用
```javascript
//问题
for(let i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i)
    },300)
}
//输出结果 5 5 5 5 5
```
```javascript
for(let i = 0; i < 5; i++){
    (function() {
        setTimeout(function(){
            console.log(i)
        },300)
    })(i)
}
//输出结果 1 2 3 4 5
```
### JSON.stringify()
1. 将普通对象转化为JSON格式
```javascript
console.log(JSON.stringify({a:1})) //{"a":"1"}
```
2. 取出对象中符合条件的值
```javascript
//设置第二个参数为[],其中包含键名
let _res = {name:'ren',age:2}
console.log(JSON.stringify(_res,['name']))//{name:'ren'}
//第二个参数也可以传一个函数
console.log(JSON.stringify(_res,(key,value)=>{
     if(typeof value === 'Number'){
       return undefined
     }
     return value
}))//{name:'ren'}
```
3. 格式替换
```javascript
console.log(JSON.stringify(obj,['name','age'],5))
输出结果：{
     "name": "renlingxin",
     "age": 11
}
console.log(JSON.stringify(obj,['name','age'],'*'))
输出结果：{
*"name": "renlingxin",
*"age": 11
}
```
### js  URI编码解码
escape（）函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。（不会对ASCII字母和数字编码）
unescape() 对escape（）编码过的解码
encodeURI()把字符串编码为 URI。
encodeURIComponent()把字符串编码为 URI 组件。
decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。
decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。

**使用区别**
```javascript
encodeURI('&') //"&"
decodeURI('&') //"&"
encodeURIComponent('&') //"%26"
decodeURIComponent('%26') //"&"
//encodeURIComponent  可以对如#*&等特殊字符进行编码
```

**URI : URL   URN**
Web上可用的每种资源 -HTML文档、图像、视频片段、程序等 - 由一个通用资源标识符（Uniform Resource Identifier, 简称"URI"）进行定位。

统一资源定位符（Uniform Resource Locator，URL）,统一资源名称（Uniform Resource Name，URN）是URI的子集。

Web上地址的基本形式是URI,它有两种形式：一种是URL，这是目前URI的最普遍形式

URN定义某事物的身份，而URL提供查找该事物的方法。URN仅用于命名，而不指定地址。
### js  Infinity  代表无穷大的值

### base-64编码解码
```javascript
//btoa()方法用于创建一个 base-64 编码的字符串。
var str = "RUNOOB";
var enc = window.btoa(str);                                             
var res = "编码字符串: " + enc; // "编码字符串: UlVOT09C"
```
```javascript
//atob()方法用于解码使用 base-64 编码的字符串。
var str = "RUNOOB";
var enc = window.btoa(str);
var dec = window.atob(enc);
var res = "编码字符串为: " + enc + "<br>" + "解码后字符串为: " + dec;
```

### Array 

添加/删除数组：
    push
    pop
    shift 
    unshift
    splice
    concat
查询数组：
    indexOf/lastindexOf
    includes
    find/fiter
    findIndex
转换数组：
    map
    sort
    reverse
    split/join
    reduce
迭代元素：
    forEach
其他：
    Array.isArray
    some/every
    fill(value,start,end)从start到end用value填充数组
    copyWithin(target,start,end)

sort reverse splice  方法修改数组本身


1.  数组方法  --- 1 array.prototype.flat (扁平化数组) Infinity -- 无穷大

```javascript
 
let arr = [1, 2, 3, 2, [34, 243, 3, [56, 21, 89, [23]]]]
console.log(arr.flat(2))
console.log(arr.flat(5))
console.log('flat实现', arr.flat(Infinity))
```

* 扩展 -- 其他数组扁平化方法
 * reduce

```javascript
    let _arr = arr => arr.reduce((pre, cru) => {
        return pre.concat(Array.isArray(cru) ? _arr(cru) : cru)
    }, [])
    console.log('reduce实现', _arr(arr))
```
*  递归

```javascript
let out = arr => {
    let _res = []
    for (let i = 0; i < arr.length; i++) {
        Array.isArray(arr[i]) ? _res = _res.concat(out(arr[i])) : _res.push(arr[i])
    }
    return _res
}
console.log('递归实现', out(arr))
```

* 扩展运算符

```javascript
let star = arr => {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
console.log('扩展运算符实现', star(arr))
```

2. 生成大量数组数据 f i l l ()

```javascript
const att = new Array(100).fill(0).map((item,index)=>index+1)
const abb = Array.from(Array(100),(v,k)=>k+1)
const aoo = [...Array(100).keys()]
```

4. 解构赋值

```javascript
// 交换变量
let a = '1111';
let c = '2222';
[a, c] = [c, a]

// 生成剩余数组
const [b, ...rest] = [...'renlingxin']
console.log(b,rest) // b:r rest:['e','n','l','i'...,'n']

```

5. 数组浅拷贝 slice  and ...

```javascript
// slice
let old = [1,2,3,4]
let newVale = old.slice()

// ...
let newVale1 = [...old] //对象也可以这么操作

// Array.from 将类数组转换为数组
let newVale2 = Array.from(old)
```

6. 数组去重 new Set

```javascript
let repeat = [1,2,34,3,333333,3,3,56,67]
// let newRepeat = Array.from(new Set(repeat))
let newRepeat = [...new Set(repeat)]
```

7. 查找符合条件的内容 find findIndex

```javascript

let openObject = [1,2,3,4,5555,6,0]
let openRes = openObject.find(item=>item>3)
console.log(openRes) //返回符合条件的第一个元素

let openResIndex = openObject.findIndex(item=>item>3)
console.log(openResIndex) //返回符合条件的第一个元素

```

8. include indexOf

```javascript

let injectData = [1,2,3,4,,4,5,5,63,2,NaN]
console.log(injectData.includes(2), injectData.includes(NaN))
console.log(injectData.indexOf(2), injectData.indexOf(NaN)) // indexOf 查不到NaN返回-1

```

9. Array()   和  Array.of()

Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组

```javascript

Array(3) // [].length === 3
Array.of(3) // [3]

```
10. Array.from

Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
三个参数 ：1.想要被操作的对象 2.函数 新数组中的每一个元素都会执行改函数 3. 执行回调函数2的this对象y

```javascript
Array.from('ren') // ['r','e','n']
Array.from([1, 2, 3], x => x + x) // [2, 4, 6]
```


### padStart padEnd (ES2017)

```javascript

    '1'.padStart(2,'0')
    '1'.padEnd(2,'0')
    
    
    function PrefixZero(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }
    
```
### if  else if  else

```javascript
let rs = ['111','222','333']
if(rs.includes('111')){
    //do something
    console.log(111)
} else if (rs.incluedes('222')){
    //do something
    console.log(222)
}else{
    console.log(333)
}
// 111 
```

### in hasownproperty 的区别

in操作符只要通过对象能访问到属性就返回true。hasOwnProperty()只在属性存在于实例中时才返回true。

```javascript
function person(){

}
person.prototype.name = 'ren'

let p1 = new person()

p1.name // 'ren'

'name' in p1 // true
p1.hasownperty('name') //false

```
### script 标签 属性

```javascript

<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>

```
> es6  阮一峰
defer与async的区别是：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。



### es6  => export export default import  common.js => module.export exports require

** es6 模块 使用  =>  前提是必须开启 本地服务器 （ http-server ）**

```javascript
// a.js
export default {
    init: function () {
        this.handleAddListener('load', function () {
            console.log("页面加载了")
        })
    },
    handleAddListener: function (type, fn) {
        if (window.addEventListener) {
            window.addEventListener(type, fn)
        } else {
            //IE
            window.attachEvent('on' + type, fn)
        }
    }
}


//b.js
import sayBaBa from './a.js'
sayBaBa.init()


//index.html => 引入方式  type="module"
// 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性，如果有多个 按先后顺序依次执行

<script src="./b.js" type="module"></script>

```

** module.exports exports require **

exports === module.exports

```javascript
//a.js
module.exports = {
    sayName:function(){
        console.log('name','任岭鑫')
    }
}


//b.js
let say = require('./a')
say.sayName()

```

#### 两者的差异
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

** es6 **

```javascript

    //a.js
    export var age = 23;
    export function editAge() {
        age++;
    }

    //b.js
    import {
    age,
    editAge,
    init
    } from './a.js'

    init()

    // es6 模块 之间传递的值 是一个引用 在其他模块中的数据操作 可能会影响到 数据源  另一种理解 他是可以动态的更新 模块中引用的数据
    console.log(age) // 23
    editAge()
    console.log(age) //24
    
```

** commonJS **

```javascript
    //a.js

    let age = 22;

    let name = 'renlingxin'

    // let person
    function setAge() {
        age++
    }
    function getName(){
        return name
    }

    //b.js

    let say = require('./a')

    // commonJS 传递的值是一个拷贝 在其他模块的改变不会影响到 数据源
    console.log(say.age); // 22

    say.setAge()

    console.log(say.age) // 22

```


2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。



### promise 相关

#### 链式调用

** 1.  new promise().then > l.then      2.     l.then1 > l.then2 内部状态不依赖 **

1. 链式调用中，只有前一个 then 的回调执行完毕后，跟着的 then 中的回调才会被加入至微任务队列。

```javascript

  Promise.resolve()
    .then(() => {
      console.log("then1");
      Promise.resolve().then(() => {
        console.log("then1-1");
      });
    })
    .then(() => {
      console.log("then2");
    });
  // 输出顺序 => then1  then1-1 then2

```
2. 每个链式调用的开端会首先依次进入微任务队列

```javascript

  let p = Promise.resolve();

  p.then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
      console.log("then1-1");
    });
  }).then(() => {
    console.log("then1-2");
  });

  p.then(() => {
    console.log("then2");
  }); 
  // then1 then2 then1-1 then1-2

```

3. 同一个 Promise 的每个链式调用的开端会首先依次进入微任务队列

```javascript

  let p = Promise.resolve().then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
      console.log("then1-1");
    });
  }).then(() => {
    console.log("then2");
  });

  p.then(() => {
    console.log("then3");
  });
  // then1 then1-1 then2 then3 当执行到then2的时候p是then2生成的，不是Promise.resolve生成的

```
4. 当链式 回调遇到 return 

```javascript

Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve()
      .then(() => {
        console.log("then1-1");
        return 1; //return 对于外层代表着回调结束了
      })
      .then((res) => {
        console.log("then1-2",res);
      });
  })
  .then((res) => {
    console.log("then2",res);
  })
  .then(() => {
    console.log("then3");
  })
  .then(() => {
    console.log("then4");
  });
  // then1 then1-1 then2,undefined then1-2,1 then3 then4 

```

```javascript

Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve()
      .then(() => {
        console.log("then1-1");
        return Promise.resolve();
      })
      .then(() => {
        console.log("then1-2");
      });
  })
  .then(() => {
    console.log("then2");
  })
  .then(() => {
    console.log("then3");
  })
  .then(() => {
    console.log("then4");
  });
 // then1 then1-1 then2 then3 then4 then1-2

```
#### 无异常捕获下的  unhandledRejection

1. unhandledRejection

当捕获器未处理的Promise错误时会产生 unhandledRejection 错误.  unhandledrejection 继承自 PromiseRejectionEvent，而 PromiseRejectionEvent 又继承自 Event。因此unhandledrejection 含有 PromiseRejectionEvent 和 Event 的属性和方法。**例如 event.preventDefault();**

```js

// node 环境 
process.on('unhandledRejection', (reason, p) => {
    console.log('未处理的 rejection：', p, '原因：', reason);
});
Promise.reject('2222') // UnhandledPromiseRejectionWarning: 2222
Promise.reject('2222').catch(console.log)


// window 环境
window.addEventListener("unhandledrejection", (event) => {
  console.log(event, "event");
  event.preventDefault();// 默认行为会控制台抛出 Uncaught (in promise)
});
```

2. try catch 同样可以捕获未处理的reject error


```js

// try catch 捕获错误
function o() {
    try {
        // Promise.reject('2222') // 1. 捕获JS未处理的Promise错误 unhandledrejection
    } catch (error) {
        console.log(error, 'f --- error') //2. promise 作为异步微任务任务并没有在try作用域中执行
    }
}
o()

async function f() {
    try {
        await Promise.reject('2222') // 异步任务 -> 同步任务
        await Promise.reject('3333').catch(console.log) //catch 捕获过的错误不会被try catch 捕获
    } catch (error) {
        console.log(error, 'f --- error')
    }
}
f()

```


### 一 、--try  catch

try  catch是作为JS中处理异常的一种标准方式。其与JAVA的语法是完全相同的。
```javascript
 try {
       //可能会导致错误的代码
        console.log(a)
    } catch (err) {
       //在错误发生的时候怎么处理
        alert(err) //错误整体
        alert(err.name)  //错误名字
        alert(err.message) //错误详情
}
```
在 try 块中的任何代码发生了错误，就会立即退出代码之心过程。然后执行 catch 块，此时， catch 块会接收一个包含错误信息的对象。这个对象的实际信息会因为浏览器不同而不同，但共同的是有一个保存着错误消息的 message 属性以及 name 属性。

### --finally子句
只有代码中包含finally子句，则无论 try 或者 catch 语句块包含什么样的代码，甚至是return 语句，都不会阻止 finally 语句的执行
```javascript
function add() {
     try {
      return 2 //代码正常执行
     } catch (err) {
         return 1  //因为 try 没有错误 不会执行
     } finally {
         return 0 //不管try 和 catch 直接执行 覆盖 try 中的 2
     }
}
console.log(add()) // 0
```
### --优点
当 try catch 语句中发生错误时，浏览器会认为错误已经被处理了，因而不会在通过浏览器的机制记录或者报告错误。这样的处理不会因为某一段代码的错误，阻塞其下代码的继续运行。
### 缺点
try...catch只能捕获到运行时的非异步错误，而语法错误和异步错误就捕捉不到。
还有一点就是try..catch比较消耗性能

### 二  、throw
throw用于随时抛出自定义错误，抛出错误时，必须要给throw操作符指定一个值。例如
```javascript
throw 123232; //其下的代码不会再执行
console.log('renlingxin')
```
**自定义错误**
```javascript
    function YourError(message) {
        this.name = 'YourError';
        this.message = message;
    }
    YourError.prototype = new Error();
    throw new YourError('your daima error')
```
```javascript
   // 当有try catch语句捕获到被抛出的错误，代码正常执行
    function YourError(message) {
        this.name = 'YourError';
        this.message = message;
    }
    YourError.prototype = new Error();
    try {
        throw new YourError('your daima error')
    } catch (err) {
        console.log(err)  //YourError {name: "YourError", message: "your daima error"}不作为错误输出
    }
```

### 三 、错误类型

* Error
基类型，其他错误类型都继承来自该类型
* EvalError  **该类型错误已经不再抛出，保留该对象多是为了兼容**
该类型错误会在使用 eval() 函数而发生异常时被抛出
```javascript
new eval(); //TypeError: eval is not a constructor
```
* RangeError
在数值超出相应范围时触发
```javascript
var item = new Array(-20);
```
* ReferenceError
在找不到对象的情况下触发，通常在访问不存在的变量的时候。
```javascript
console.log(a) // a为未定义
```
* SyntaxError
JS遇到非法的代码或者操作时，抛出SyntaxError错误
```javascript
a -- b  // -- 为非法操作符
```
* TypeError
访问不存在的方法，通常是变量的类型不符合预期时触发
```javascript
new 1;  // 1 不是构造函数
add();  //add时未定义的方法
```


### 实现只执行一次的函数

```javascript

function getname (fn) {
  let one = false
  return function () {
    if (!one) {
      one = true
      fn.apply(this, arguments)
    }
  }
}
let one = getname(fn)
one()
one()

```
### web worker

概念：为js创建多线程的运行环境，可以把一部分任务移交给web worker来执行

阮一峰的笔记：http://www.ruanyifeng.com/blog/2018/07/web-worker.html

**Web Worker 有以下几个使用注意点。**

1. 同源限制
分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
2. DOM 限制
Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。
3. 通信联系
Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
4. 脚本限制
Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
5. 文件限制
Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络



### 一些不经意的知识点

1. 函数作用域

```javascript

  //1. 函数作用域里声明的变量会在函数执行完成后销毁
  function test(){
   var b = 'hi'//这是在函数作用域里的变量提升 提升在当前函数作用域
  }
  test()
  console.log(b)//报错Uncaught ReferenceError: time is not defined
  
  //2. 快手面试
    //第一种情况
      var x = 10
      function d(y) {
          var x = 20;
          return b(y)
      }
      //函数b执行的时候 上一层作用域就是全局 所以取到了10
      function b(y) {
          return x + y
      }
      console.log(d(20)) //30
      
      //第二种情况
      var x = 10
      function d(y) {
          var x = 20;
          //函数b执行的时候 上一层作用域是d 所以取到了20
          function b(y) {
              return x + y
          }
          return b(y)
      }
      console.log(d(20)) //40
      //第三种情况
      var x = 10
      function d(y) {
          var x = 20;
          //这里的x和y会直接在当前的作用域中找
          return x+y
      }
      console.log(d(20)) //40
    
```
2. 箭头函数和settimeout

```javascript

    var name = 'dd'

    function getname() {
        console.log('xx',this.name); //renlingxin
        setTimeout(function name(params) {
            console.log('this', this.name);
        },100)
    }
    function getname1() {
        setTimeout(() => {
            console.log('this', this.name);
        }, 100)
    }
    getname.call({
        name: 'renlingxin'
    }) // dd
    getname1.call({
        name: 'renlingxin'
    }) //renlingxin
    

```


3. 小众思考题

```javascript

var a=?;
if(a==1&&a==2&&a==3){
     console.log('小样儿！');
}
 
 问：当a等于什么的时候，if条件成立，并打印？

//正确答案1：

var a = {
  num:1,
  toString: function(){
    return a.num++
  }
}

//原理

不同类型的值进行比较，JS会根据类型转换规则将它们转为同一个类型比较。比如上面Object 类型与 Number 类型进行比较，Object 类型会转换为 Number 类型。转换为时会尝试调用 Object.valueOf 和 Object.toString 来获取对应的数字基本类型。

//正确答案2：
var a=[1,2,3,4];
a.join=a.shift;
 if(a==1&&a==2&&a==3){
     console.log("恭喜答对啦！");
 }else{
     console.log("还是错了小子！");
 }
//原理

数组调用tostring方法的时候会间接调用join方法

```

4. 函数作用域 

```javascript

var x =1
function t(a,b=function(){x=2}){
    var x = 3
    b()
    console.log('t',x)//3
}
t()
console.log('global',x)//2

```

5. 宏任务和微任务都有哪些

**宏任务**
* setTimeout
* setInterval
* setImmediate

不是标准的一个方法，并且只有IE浏览器支持它。该方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数。（和setTimeout的时机略有不同）

* MessageChannel

创建一个通道 
概念 =》 window.postMessage()方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

用途
1.页面和其打开的新窗口的数据传递

2.多窗口之间消息传递

3.页面与嵌套的 iframe 消息传递

```html

<body>
    <button id="part1">点我给2发送信息</button><button id="part2">点我给1发送信息</button>
</body>
<script>
    //创建MessageChannel实例  返回一个带有两个MessagePort属性的MessageChannel新对象。
    let channel = new MessageChannel()
    //两个端口通道
    let port1 = channel.port1
    let port2 = channel.port2
    //onmessage 接受消息
    port1.onmessage = function (e) {
        console.log('port1：', e.data)
    }
    port2.onmessage = function (e) {
        console.log('port2：', e.data)
    }

    let _part1 = document.getElementById('part1')
    _part1.addEventListener('click', () => {
        //postMessage发送消息
        port1.postMessage('我是你爸爸')
    }, false)

    let _part2 = document.getElementById('part2')
    _part2.addEventListener('click', () => {
        port2.postMessage('我是你儿子')
    }, false)
</script>

</html>

```

* requestAnimationFrame


1. 概念 => 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

2. 链接 => https://www.jianshu.com/p/fa5512dfb4f5
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame

3. 传入的回调函数会接收到一个参数 这个参数 是一个十进制数 单位是毫秒 它的意义是当前被 requestAnimationFrame() 排序的回调函数被触发的时间。

```javascript

相较于JS动画的优点
// 1、requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
// 2、在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

```

* I/O
* UI交互事件

**微任务**
* Promise.then
* MutationObserver
  概念 =>监听DOM变化的，定义在DOM4中，对应的是DOM3中的  Mutation events 
  资料 => https://developer.mozilla.org/zh-cn/docs/web/api/mutationobserver
      https://www.jianshu.com/p/b5c9e4c7b1e1

```html
<html>

<body>
    <div id="target">4343434</div>
    <button id="btn">点我试试</button>
</body>
<script>
    let _target = document.getElementById('target')

    // childLIst 观察目标节点的子节点的新增和删除。
    // attributes 观察目标节点的属性节点(新增或删除了某个属性,以及某个属性的属性值发生了变化)。
    // characterData 如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化
    // subtree 观察目标节点的所有后代节点(观察目标节点所包含的整棵DOM树上的上述三种节点变化)
    // attributeOldValue 在attributes属性已经设为true的前提下, 将发生变化的属性节点之前的属性值记录下来(记录到下面MutationRecord对象的oldValue属性中)
    // characterDataOldValue 在characterData属性已经设为true的前提下,将发生变化characterData节点之前的文本内容记录下来(记录到下面MutationRecord对象的oldValue属性中)
    // attributeFilter 一个属性名数组(不需要指定命名空间),只有该数组中包含的属性名发生变化时才会被观察到,其他名称的属性发生变化后会被忽略想要设置那些删选参数的话，
    
    const config = {
        attributes: true,
        childList: true,
        subtree: true
    }


    const callback = function (mutationsList, observer) {
        // mutationsList 监听的类型 observer 实例化的观察器
        console.log('mutationsList', mutationsList)
        for (let item of mutationsList) {
            if (item.type === 'childList') {
                console.log('childList')
            } else if (item.type === 'attributes') {
                console.log('attributes');
            }
        }
    }
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);
    // 观察器的方法1 ---- 初始化观察器 传入目标DOM和监听类型
    observer.observe(_target, config);

    // 观察器的方法2 ---- 取消监听
    // observer.disconnect()



    function _c() {
        _target.innerHTML = '更改了'
    }
    document.getElementById('btn').addEventListener('click', _c, false)
</script>

</html>



```

* Object.observe  废弃了 监听对象的变化 --- 异步的   
* process.nextTick 

概念 => 方法将 callback 添加到下一个时间点的队列 ；node 里面提供的 它的执行时间在下一轮异步任务的最前面 也就是早于settimeout setinterval  setImmediate

6. weakmap weakset

MDN: https://developer.mozilla.org/zhcn/docs/web/javascript/reference/global_objects/weakset
https://developer.mozilla.org/zhCN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

1. weakmap
提供的方法：
set   get  has  delete 
```javascript
    // WeakMap  => 跟map差不多 但是他这个里面的键值都是弱引用的 也就是不用就销毁了
    // 官方的说法 很真实 =>    在 JavaScript 里，map API 可以通过使其四个 API 方法共用两个数组(一个存放键,一个存放值)来实现。给这种 map 设置值时会同时将键和值添加到这两个数组的末尾。从而使得键和值的索引在两个数组中相对应。当从该 map 取值的时候，需要遍历所有的键，然后使用索引从存储值的数组中检索出相应的值。
    // 但这样的实现会有两个很大的缺点，首先赋值和搜索操作都是 O(n) 的时间复杂度( n 是键值对的个数)，因为这两个操作都需要遍历全部整个数组来进行匹配。另外一个缺点是可能会导致内存泄漏，因为数组会一直引用着每个键和值。这种引用使得垃圾回收算法不能回收处理他们，即使没有其他任何引用存在了。
    let t = new WeakMap()

    function handler() {
        alert('被点了')
    }
    let _weakmap = document.getElementById('weakmap')
    t.set(_weakmap, handler)
    t.has(_weakmap)
    // t.delete(_weakmap)
    _weakmap.addEventListener('click', t.get(_weakmap), false)

```


```javascript

//weakmap 的
let e = new WeakMap()
e.set({},'111')
console.log(e) //是空的  代码执行完就没了 因为空对象没有被任何别的地方引用

let f = {
    d: {}
}
e.set(f.d,'111') //这个就有了 因为d对象被f对象内部引用了 销毁不了




```

2. weakset

```javascript

    // WeakSet => 只有三个方法 add has delete 这个里面只能是存对象 Set里面是能存任意类型的 同样的它的引用也是一种弱引用
    //  如果没有其他的对WeakSet中对象的引用，那么这些对象会被当成垃圾回收掉
    let d = new WeakSet()
    let o = {}
    d.add(o)
    d.add(o)
    console.log(d);

```

```javascript
    // MDN的官方实例  递归中 避免重复处理相同的内容
    // 对 传入的subject对象 内部存储的所有内容执行回调
    function execRecursively(fn, subject, _refs = null) {
        if (!_refs)
            _refs = new WeakSet();

        // 避免无限递归
        if (_refs.has(subject))
            return;

        fn(subject);
        if ("object" === typeof subject) {
            _refs.add(subject);
            for (let key in subject)
                execRecursively(fn, subject[key], _refs);
        }
    }

    const foo = {
        foo: "Foo",
        bar: {
            bar: "Bar"
        }
    };

    foo.bar.baz = foo; // 循环引用!
    execRecursively(obj => console.log(obj), foo);

```




### 循环

1. forEach
```javascript
let t = [1,2,3,5]
t.forEach(e=>{
  console.log(e)
  if(e===3) {
    return false //通过return false 只能跳出本次循环 并不能终止forEach
  }
})
// 1,2,3,5

```
2. for

```javascript
let t = [1,2,3,5]
for(let i=0;i<t.length;i++){
  console.log(t[i])
  if(t[i] === 3){
    break //终止for循环
    contuine //continue 结束本次循环
  }
}


```

### settimeut 使用方式

```javascript
setTimeout(()=>{},1000) 
setTimeout(console.log,1000,'232','3333','4444')
//参数
//1. fn 回调函数
//2. delay 时间
//3. 之后的参数会在 delay 时间后作为参数传递给 fn

// 返回值
//返回值timeoutID是一个正整数，表示定时器的编号。这个值可以传递给clearTimeout()来取消该定时器。

//需要注意的是setTimeout()和setInterval()共用一个编号池，技术上，clearTimeout()和 clearInterval() 可以互换。但是，为了避免混淆，不要混用取消定时函数。

```

### Promise

