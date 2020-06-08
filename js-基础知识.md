### 数组 对象深拷贝

##### es6剩余运算符

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
###### undefined 
**undefined表示这个值未定义 在使用var声明变量但并未对其加以初始化的时候，这个变量的值就是undefined **
```javascript
  var a;
  a === undefined  //true
```
###### null
从逻辑角度上看，null值表示一个**空对象指针**
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
1. 	字符方法 chatAt()  和  chatCodeAt()
```javascript
var o = 'renlingxin';
o.chatAt(1); //e  返回给定位置的字符
o.chatCodeAt(1); //101 返回给定位置字符编码
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
7. replace 方法扩展
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
8. Math.ceil()向上取整
```javascript
Math.ceil(1.2) //2
```
生成n-m的随机整数
```javascript
Math.floor(Math.random() * (m-n+1) + n)
Math.round(Math.random() * (m-n) + n)
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