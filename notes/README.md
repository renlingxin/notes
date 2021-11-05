# notes
Ren lingxin's study notes


### 1. TCP UDP websocket http https的区别 
资料：
* TCP UDP => https://www.cnblogs.com/fundebug/p/differences-of-tcp-and-udp.html
* TCP => https://juejin.cn/post/6844904070889603085
*HTTP、TCP与UDP、Socket与Websocket  https://blog.csdn.net/weixin_40155271/article/details/80869542

*websockrt  https://www.jianshu.com/p/6b2b9897267b?from=groupmessage&isappinstalled=0

```javascript

  //        UDP	  TCP     两者区别
  是否连接	无连接	| 面向连接
  是否可靠	不可靠传输，不使用流量控制和拥塞控制 |	可靠传输，使用流量控制和拥塞控制
  连接对象个数	支持一对一，一对多，多对一和多对多交互通信 |	只能是一对一通信
  传输方式	面向报文 |	面向字节流
  首部开销	首部开销小，仅8字节 |	首部最小20字节，最大60字节
  适用场景	适用于实时应用（IP电话、视频会议、直播等）|	适用于要求可靠传输的应用，例如文件传输
  //补充 1.两者都是传输层协议 2. http和websocket本质是基于tcp的封装
  
```
OSI七层协议 ： 应用层=》表示层=》会话层=》传输层=》网络层=》数据链路层=》物理层

TCP/IP概念 是对上面简化 ： 应用层=》传输层=》网络层=》链路层
> 1. 链路层：负责封装和解封装IP报文，发送和接受ARP/RARP报文等。
> 2. 网络层：负责路由以及把分组报文发送给目标网络或主机。
> 3. 传输层：负责对报文进行分组和重组，并以TCP或UDP协议格式封装报文。
> 4. 应用层：负责向用户提供应用程序，比如HTTP、FTP、Telnet、DNS、SMTP等。

**http和websocket**

websocket和http的区别：
1. WebSocket是双向通信协议，模拟Socket协议，可以双向发送或接受信息，而HTTP是单向
2. WebSocket是需要浏览器和服务器握手进行建立连接的，而http是浏览器发起向服务器的连接。


### 2. Async await promise
### 3. 页面性能优化
引用：https://segmentfault.com/a/1190000020867090
1. 内容
* Make Fewer HTTP Requests：减少HTTP请求数
* Reduce DNS Lookups：减少DNS查询
Avoid Redirects：避免重定向
Make Ajax Cacheable：缓存AJAX请求
Postload Components：延迟加载资源
Preload Components：预加载资源
* Reduce The Number Of DOM Elements：减少DOM元素数量
Split Components Across Domains：跨域拆分资源
Minimize The Number Of Iframes：减少iframe数量
* No 404s：消除404错误
2. 样式
* Put Stylesheets At The Top：置顶样式
* Avoid CSS Expressions：避免CSS表达式
* Choose \<link\> Over @import：选择<link>代替@import
Avoid Filters：避免滤镜
3. 脚本
* Put Scripts At The Bottom：置底脚本
* Make JavaScript And CSS External：使用外部JS和CSS
* Minify JavaScript And CSS：压缩JS和CSS
* Remove Duplicate Scripts：删除重复脚本
* Minimize DOM Access：减少DOM操作
Develop Smart Event Handlers：开发高效的事件处理
4. 图像
* Optimize Images：优化图片
* Optimize CSS Sprites：优化CSS精灵图
* Don't Scale Images In HTML：不在HTML中缩放图片
* Make Favicon.ico Small And Cacheable：使用小体积可缓存的favicon
5. 缓存
* Reduce Cookie Size：减少Cookie大小
Use Cookie-Free Domains For Components：使用无Cookie域名的资源
6. 移动端
Keep Components Under 25kb：保持资源小于25kb
Pack Components Into A Multipart Document：打包资源到多部分文档中
7. 服务器
* Use A Content Delivery Network：使用CDN
* Add An Expires Or A Cache-Control Header：响应头添加Expires或Cache-Control
* Gzip Components：Gzip资源
* Configure ETags：配置ETags
Flush The Buffer Early：尽早输出缓冲
Use Get For AJAX Requests：AJAX请求时使用get
* Avoid Empty Image Src：避免图片空链接










### 4. 排序 快速排序 以及时间复杂度
```javascript
  function _c(arr){
    let _left = []
    let _right = []
    let _con  = arr[0]
    for(let i=0;i<arr.length;i++){
      if(arr[i]<_con){
        _left.push(arr[i])
      }else{
        _right.push(arr[i])
      }
    }
    return _con.concat(_c(_left),_C(_right))
  }
  //时间复杂度 =》O(nlogn);
  //空间复杂度 =》O(logn)
```

### 5. 304 状态码
```javascript
// 301 =》 永久重定向
// 302 =》 临时重定向
// 303 =》 查看其它位置
// 304 =》 未修改（自上次请求之后没有发生改变）

// 400 =》 服务器不理解
// 401 =》 未授权
// 403 =》 服务器拒绝了
// 404 =》 未找到

// 500 =》 服务器内部错误
// 503 =》 服务器压力过大
```

**302 303 307的区别**
1. 302 在浏览器的实现中，302默认以get重新发出请求。比如 以post访问 a.com ,用302重定向到b.com，浏览器会使用get请求b.com。但这样就会导致之前的post请求数据丢失，相对的 307不允许修改请求方法
2. 303 重定向到新地址时，客户端必须使用GET方法请求新地址。
3. 这个状态码和302相似，有一个唯一的区别是不允许将请求方法从post改为get。

**永久重定向： 301和308。
两者都默认缓存，但是308不允许将请求方法从POST修改到GET, 301允许**

**临时重定向：302，303，307
303强制浏览器可以将请求方法从POST修改到GET
307不允许浏览器修改请求方法。
302一开始的标准是不允许修改POST方法，但是浏览器的实现不遵循标准，标准就向现实妥协而做了修改**

### 6. SDK 导出格式
```javascript
// package.json ：
// name 姓名 version 版本 main 入口 files 导出文件
```
### 7. eventloop
```javascript
// 同步任务 异步任务（宏任务和微任务）
// 宏任务 =》 setTimeout setInterval
// 微任务 =》 promise 

```

### 8. 堆栈 原型链
```javascript
// 基础数据类型 =》 栈
// 复杂数据类型 =》 堆 并且在栈中存在堆的引用

```

### 9. script defer 和async的区别
```javascript
defer =》 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded (en-US) 事件前执行。
有 defer 属性的脚本会阻止 DOMContentLoaded 事件，直到脚本被加载并且解析完成。
async =》 对于普通脚本，如果有 async 属性，那么脚本会被并行请求，并尽快解析和执行。

```
### 10. 页面初始的生命周期onload/ DOMContentLoaded /readystatechange
* DOMContentLoaded 事件

 当初始的HTML文档被完全加载和解析完成之后，DOMContentLoaded 事件被完全触发，而无需等待样式表、图像和子框架的加载。

* onload 事件 当整个页面及所有依赖资源如样式表和图片已完成加载时，都会触发load事件。

* readystatechange 是在readyState发生改变时触发

```javascript
1. loading（正在加载）
2. document 仍在加载。
3. interactive（可交互）
文档已被解析，"正在加载"状态结束，但是诸如图像，样式表和框架之类的子资源仍在加载。
4. complete（完成）
文档和所有子资源已完成加载。表示 load (en-US) 状态的事件即将被触发。
```
* MDN 上的例子
```javascript
window.addEventListener('load', (event) => {
    log.textContent = log.textContent + 'load\n';
});

document.addEventListener('readystatechange', (event) => {
    log.textContent = log.textContent + `readystate: ${document.readyState}\n`;
});

document.addEventListener('DOMContentLoaded', (event) => {
    log.textContent = log.textContent + `DOMContentLoaded\n`;
});
//以下是输出顺序
//readystate: interactive
//DOMContentLoaded
//readystate: complete
//load
```


### 10. tips
```javascript
let t = { name: 'renlginxim' }
let y = t = {}
console.log('yyyy', y, t)
```
```javascript
//let typeof
function o() {
    let a = b = 0//这里可以拆解成let a=0 b=0 b被定义到了全局
    a++
    return a
}
o()
console.log(a)//直接打印a会报错
console.log(b,'ttttt')//0
console.log(typeof a, typeof b, '344444')
```
```javascript
// 对象引用问题
let foo = { n: 1 }
let bar = foo
// foo.x = foo = {n:2} //foo.x 改变了foo和bar foo = {n:2} 是直接赋值了对象 并没有改变对象所以bar没有跟着改变
// 可以拆解成
foo.x = foo
foo = { n: 2 }
console.log(foo, bar, 'js中的奇怪问题')

```
### 11. 设备像素比 （告诉设备1px用多少物理像素描述）

### 12. viewport

**viewport 是用户网页的可视区域。**
1. width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
2. height：和 width 相对应，指定高度。
3. initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
4. maximum-scale：允许用户缩放到的最大比例。
5. minimum-scale：允许用户缩放到的最小比例。
6. user-scalable：用户是否可以手动缩放。

### 13. 前端安全 XSS XSRF

1. XSS 跨域脚本攻击
核心原理是：不需要你做任何的登录认证，它会通过合法的操作（比如在url中输入、在评论框中输入），向你的页面注入脚本（可能是js、hmtl代码块等）

2. XSRF 跨站请求伪造
核心原理：
（1）登录受信任网站A，并在本地生成Cookie。（如果用户没有登录网站A，那么网站B在诱导的时候，请求网站A的api接口时，会提示你登录）

（2）在不登出A的情况下，访问危险网站B（其实是利用了网站A的漏洞）。
### 14. Hybrid通信方式
1. jsBridge (原生可以拦截 alert(警告框)，comfirm(确认框)和prompt(提示框)方法)
2. URL 拦截url
### 15. 代码操作dom的执行时机

### 16. 回流和重绘

### 17. Eventloop

### 18. var的变量提升 window是否都会挂载 
全局定义下会。函数中定义的不会
### 19. requestAnimationFrame 执行时机

页面刷新的时机执行

### 20. rem原理 （是否改变根元素）是的改变根元素的size

### 21. h5 新特性 新的(有一个能实现滚动条)
* 标签
1. <progress></progress> 滚动条
2. <audio></audio> :播放音频
3. <video></video> : 播放视频
4. mark元素，用来展示高亮的文字。
5. header元素，表示页面中一个内容区块或整个页面的页眉。
6. hgroup元素，用于对页面中一个区块或整个页面的标题进行组合。
7. footer元素，表示页面中一个内容区块或整个页面的页脚。
8. figure元素，表示媒介内容的分组，以及它们的标题。
9. section元素，表示页面中一个内容区块，比如章节。
10. nav元素，表示页面中的导航链接。

* API
1. querySelect()和querySelectAll() 前者符合条件的元素 后者是数组
2. document.getElementsByClassName(selector) 返回nodeList
3. 自定义属性 HTML5规定可以为元素添加非标准的属性，但要添加前缀data-
4. 预加载 prefetch 预加载是一种浏览器机制，使用浏览器空闲时间来预先下载/加载用户接下来很可能会浏览的页面/资源
```html
<link rel="prefetch" href="page2.html" />
```
5. 本地存储（Local Storage）localStorage   sessionStorage


### 22. 箭头函数和普通函数区别（是否是构造函数和作用域问题）
* 编写方式的不同
* this 的指向不同 并且箭头函数的this指向不能改变
箭头函数不会创建自己的this，所以它没有自己的this，它只会从自己的作用域链的上一层继承this。
* 箭头函数没有arguments
* 箭头函数没有prototype
* 箭头函数不能当做构造函数使用
个人理解是区分函数和类；因为箭头函数没有自己的this，它的this其实是继承了外层执行环境中的this，且this指向永远不会随在哪里调用、被谁调用而改变，所以箭头函数不能作为构造函数使用
```javascript
var id = 'Global';

function fun1() {
    // setTimeout中使用普通函数
    setTimeout(function(){
        console.log('fun1',this.id);
    }, 2000);
}

function fun2() {
    // setTimeout中使用箭头函数
    setTimeout(() => {
        console.log('fun2',this.id);
    }, 2000)
}

fun1.call({id: 'Obj'});     // 'Global' 两秒后作用域是全局

fun2.call({id: 'Obj'});     // 'Obj'

```
### 23. css in js

### 24. css 哪些可以被继承

### 25. scss 和 less 中定义变量方式

### 26. 函数的执行过程

### 27. cookie是谁存的
* 概念： Cookie是由服务器端生成，发送给User-Agent（一般是浏览器），（服务器告诉浏览器设置一下cookie），浏览器自动会将Cookie以key/value保存到某个目录下的文本文件内，下次请求同一网站时也会自动发送该Cookie给服务器，即添加在请求头部（前提是浏览器设置为启用cookie）。
Cookie就是一个小型文件（浏览器对cookie的内存大小是有限制的-------用来记录一些信息）

* cookie的一些属性 
name =》名字 
value=》内容
domain=》可以访问的域名
path =》指定路径可以访问  
expires/Max-Age=》　字段为此cookie超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。
http=》 字段  cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。


* 缺陷 =》 
1. Cookie 会被附加在每个 HTTP 请求中，所以无形中增加了流量。
2. 由于 HTTP 请求中的 Cookie 是明文传递的，所以安全性成问题，除非使用超文本传输安全协定。
3. Cookie 的大小限制在 4 KB 左右，对于复杂的存储需求来说是不够用的

设置cookie document.cookie='name=xiaoming;expires='+oDate
28. 面向对象三大特性 =》 继承 多态 封装

### 29. DOM
dom有不同的节点：文档节点、元素节点、属性节点、文本节点、注释节点


### 30. 事件模型

1. 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；
2. 目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；
3. 冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点），事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；### 事件
**event.stopPropagation()起到阻止捕获和冒泡阶段中当前事件的进一步传播。使用event.preventDefault()可以取消默认事件**
### 31. let const var
1. let 和 var 声明一个变量, const 声明一个只读的常量
2. let 和 const 不存在变量提升, var会发生变量提升
3. let和const存在暂时性死区, 凡是在声明之前使用这些变量就会报错
4. let 和 const 不允许在相同作用域内, 重复声明一个变量
5. let 和 const 存在块级作用域
6. const 保证的变量保存的数据不得改动, 但如果将一个对象声明为变量, const只能保证这个指针是固定的, 对于它指向的数据结构就不能控制

**重要**
```javascript
const d = [2,3,4]
const c = d.push(4)//这里修改d不会报错，虽然是const定义的但是复杂数据是引用。这里没有改变引用。
d = [3] //这是会报错的。因为修改了引用

```

### 32. 判断数据类型（数组）
1. Array.isArray()  => 原理是
```javascript
Array.isArray = function(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}
```
2. instanceOf  用于判断对象的构造函数的原型对象是否在对象的原型链上
3. constructor 返回对象相对应的构造函数
>注意：
使用instaceof和construcor,被判断的array必须是在当前页面声明的！比如，一个页面（父页面）有一个框架(iframe)，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array ==object.constructor;会返回false；
原因：
1、array属于引用型数据，在传递过程中，仅仅是引用地址的传递。
2、每个页面的Array原生对象所引用的地址是不一样的，在子页面声明的array，所对应的构造函数，是子页面的Array对象；父页面来进行判断，使用的Array并不等于子页面的Array。

**重点**
1. typeof会返回一个变量的基本类型，instanceof返回的是一个布尔值

2. instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型

3. 而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断



### 33.  输入url到渲染的过程
1. DNS 解析:将域名解析成 IP 地址
```html
（1）、DNS：把域名和ip地址相互映射分布式数据库，让用户能更方便的访问互联网，DNS协议运行在UDP协议之上
（2）、DNS解析：通过域名最终得到对应ip地址的过程。
（3）、DNS缓存：浏览器，操作系统，路由器，本地DNS，根域名服务器都会对DNS结果作出一定的缓存
```
2. TCP 连接：TCP 三次握手
3. 发送 HTTP 请求
4. 服务器处理请求并返回 HTTP 报文
5. 浏览器解析渲染页面
6. 断开连接：TCP 四次挥手

* 浏览器解析渲染页面

1. 根据 HTML 解析出 DOM 树
2. 根据 CSS 解析生成 CSS 规则树
3. 结合 DOM 树和 CSS 规则树，生成渲染树
4. 根据渲染树计算每一个节点的信息
5. 根据计算好的信息绘制页面

> 渲染阻塞

**js导致的阻塞**
当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行，然后继续构建DOM.如果JavaScript脚本还操作了CSSDOM，而正好这个CSSDOM还没有下载和构建，浏览器甚至会延迟脚本执行和构建DOM，直至完成其CSSDOM的下载和构建。
**css导致的阻塞**
当解析html的时候，会把新来的元素插入dom树里面，同时去查找css，然后把对应的样式规则应用到元素上，查找样式表是按照从右到左的顺序去匹配的。大量嵌套会影响

> 有关渲染的几个问题
引用：https://www.zhihu.com/question/59024365

1. html下载与执行是同步的吗?
分情况
A：网速快的情况下解析和执行会相对靠后
B：网速慢的情况下浏览器会边下载边去执行解析。表现是页面内容一块一块的出来

html执行这个描述不准确，所谓的执行包括parseHTML（解析HTML）、layout（布局）、paint（绘制）几个阶段。download、parseHTML/parseCSS/executeJS、layout、paint都在不同进程中。**parseHTML/parseCSS并行**，共同完成后layout生成渲染树，进而paint渲染。执行JS会重新回到layout阶段。

2. css文件的下载和渲染是同步的吗? 还是先下载完, 再渲染?
不确定下载过程中是否同步做词法分析parseCss，但是可能性很大，毕竟是种无损失的优化方案，

但是**最终肯定需要下载完再layout生成渲染树，进而渲染。**

3. css文件的下载&执行 和 html文件的下载&执行同步吗?
**并行的**。但是需要注意一些限制，比如一个域名下最大并发**6个请求**，再多就得串行。

4. 图形的加载 和 html文件的下载/执行同步吗, 音视频呢, 别的资源呢?
**并行的**。但是需要注意一些限制，比如一个域名下最大并发**6个请求**，再多就得串行。

5. js文件的下载&执行和html文件的下载&执行同步还是异步?如果带有async和defer呢?
下载但是不执行js

6. 有没有可能出现html文件/图片/css文件/js文件同时下载的情况?
常态



### 34. 元素水平垂直居中的方案

1. position + transform
```css
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            
translate()函数是css3的新特性.在不知道自身宽高的情况下，可以利用它来进行水平垂直居中.
当使用：top: 50%;left: 50%;， 是以左上角为原点，故不处于中心位置
 translate(-50%,-50%) 作用是，往上（x轴）,左（y轴）移动自身长宽的 50%，以使其居于中心位置。
```
2. position + margin:auto=>分配剩余空间
```css
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
四个方向的偏移量全都为0，之后设置 margin:auto 分配剩余空间，令元素的均匀拖拽至父元素的中心位置。

```

### 35. SVG 和 canvas 区别
引用：https://github.com/abcrun/abcrun.github.com/issues/13

1. 从图像类别区分，Canvas是基于**像素的位图**，而SVG却是基于**矢量图形**。可以简单的把两者的区别看成photoshop与illustrator的区别。
2. 从渲染模式上来说，Canvas属于** 即时模式**，而SVG则是 **保留模式** ,这两种模式的区别可以参见 cshao 的博文： http://www.lifelaf.com/blog/?p=354。
3. 从结构上说，Canvas没有图层的概念，所有的修改整个画布都要重新渲染，而SVG则可以对单独的标签进行修改。
4. 从操作对象上说，Canvas是基于HTML **canvas标签**，通过宿主提供的Javascript API对整个画布进行操作的，而SVG则是基于**XML**元素的。
5. 从功能上讲，SVG发布日期较早，所以功能相对Canvas比较完善。
6. 关于动画，Canvas更适合做基于位图的动画，而SVG则适合图表的展示
7. 从搜索引擎角度分析，由于svg是有大量标签组成，所以可以通过给标签添加属性，便于爬虫搜索。
8. canvas依赖分辨率 SVG则不会

### 36. div 模拟实现textarea

### 37. 实现div垂直居中，左右10px，高度始终为宽度的一半

Padding-bottom:50%

### 38. null是对象吗

### 39. instanceof是否能判断基本类型  判断数据类型的其它方式
不能
1. instanceof 
一般用于判断复杂类型
*局限性*
当一个页面存在多个iframe时,也就是存在多个全局变量window,instanceof的判断会被来自不同的iframe的数据所干扰,导致不可信
> 假设:页面pageA 通过iframe内嵌了页面pageB, 此时pageB传递了一个数组 let arrB = []到页面 pageA, 若在pageA使用instanceof判断数组arrB会出现 arrB instanceof Array // false 主要原因是因为 arrB 是由pageB上的Array构造出来的


2. constructor的局限性
1. null, undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。
2. 函数的 constructor 是不稳定的，这个主要体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object

### 40. 1px 问题
引用：https://juejin.cn/post/6844903877947424782#heading-13

设备像素比的对物理像素的大小描述失真
1. 使用边框图片
2. box-shadow  
```javascript
box-shadow: 0  -1px 1px -1px #e5e5e5,   //上边线
            1px  0  1px -1px #e5e5e5,   //右边线
            0  1px  1px -1px #e5e5e5,   //下边线
            -1px 0  1px -1px #e5e5e5;   //左边线
```
3. 伪类+缩放
```javascript
.setOnePx{
  position: relative;
  &::after{
    position: absolute;
    content: '';
    background-color: #e5e5e5;
    display: block;
    width: 100%;
    height: 1px; /*no*/
    transform: scale(1, 0.5);
    top: 0;
    left: 0;
  }
}
```
4. 设置viewport的scale值


### 41. webpack
引用：https://juejin.cn/post/6844904094281236487

1. loader

* image-loader：加载并且压缩图片文件
* json-loader 加载 JSON 文件（默认包含）
* babel-loader：把 ES6 转换成 ES5
* ts-loader: 将 TypeScript 转换成 JavaScript
* css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
* style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
* eslint-loader：通过 ESLint 检查 JavaScript 代码
* tslint-loader：通过 TSLint检查 TypeScript 代码
* vue-loader：加载 Vue.js 单文件组件

2. plugin

* ignore-plugin：忽略部分文件
* size-plugin：监控资源体积变化，尽早发现问题


3. loader和plugin的区别

* Loader **本质就是一个函数**，在该函数中对接收到的内容进行转换，返回转换后的结果。
因为 Webpack 只认识 JavaScript，所以 Loader 就成了**翻译官**，对其他类型的资源进行转译的预处理工作。
* Plugin 就是插件，**基于事件流框架 Tapable**，插件可以扩展 Webpack 的功能，**在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。**
* Loader 在 module.rules 中配置，作为模块的解析规则，**类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。**
Plugin 在 plugins 中单独配置，**类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。**

### 41-2. webpack构建流程
* 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
* 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
* 确定入口：根据配置中的 entry 找出所有的入口文件
* 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
* 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统





### 42. 实现斜线
1. 通过旋转
```javascript
transform: rotate(45deg);
```
2. 通过伪类叠加
```css
.sanjiao {
  position: relative;
  margin: 50px auto;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid #333;
  background: #fff;
  line-height: 120px;
  text-indent: 5px;
}

.sanjiao::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border: 49px solid transparent;
  border-left: 49px solid deeppink;
  border-bottom: 49px solid deeppink;
}

.sanjiao::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border: 48px solid transparent;
  border-left: 48px solid #fff;
  border-bottom: 48px solid #fff;
}
```

### 43. vue 的componted缓存怎么实现
dirty =》 字段是实现缓存的关键 ；个人理解如果这个字段是true那么就会就行重新计算求值否则还是旧数据 第一次这个字段是true

### 44. 动画属性 
1. animation 
* animation-name	规定需要绑定到选择器的 keyframe 名称。。
* animation-duration	规定完成动画所花费的时间，以秒或毫秒计。
* animation-timing-function	规定动画的速度曲线。
```javascript
inear=》自始至终保持同样速度
ease=》以低速开始，然后加速结束前变慢
ease-in=》以低速开始
ease-out=》以低速结束
ease-in-out=》低速开始和结束
cubic-bezier(n,n,n,n)=》贝塞尔曲线
```
* animation-delay	规定在动画开始之前的延迟。
* animation-iteration-count	规定动画应该播放的次数。
```javascript
n=>播放几次
infinite=》无限循环
```
* animation-direction	规定是否应该轮流反向播放动画。
```javascript
normal=》默认值-正常播放
alternate=》轮流反向播放
```

* 兼容书写方式

```css

-webkit-animation: name time 动作方式 次数
/* Safari 和 Chrome */

```



2. transfrom transtion 

> transtion

* transition-property	规定设置过渡效果的 CSS 属性的名称。
* transition-duration	规定完成过渡效果需要多少秒或毫秒。需要单位s
* transition-timing-function	规定速度效果的速度曲线。(和上面的animation一样)
* transition-delay	定义过渡效果何时开始。

> transfrom

* rotate 旋转 需要设置单位deg
* translate 位移
* scale 缩放
* skew 扭曲

### 45. 面向对象

> 面向对象编程——Object Oriented Programming，简称OOP，是一种程序设计思想。OOP把对象作为程序的基本单元，一个对象包含了数据和操作数据的函数。面向对象的程序设计把计算机程序视为一组对象的集合，而每个对象都可以接收其他对象发过来的消息，并处理这些消息，计算机程序的执行就是一系列消息在各个对象之间传递。

> 面向过程的程序设计把计算机程序视为一系列的命令集合，即一组函数的顺序执行。为了简化程序设计，面向过程把函数继续切分为子函数，即把大块函数通过切割成小块函数来降低系统的复杂度。

>对象的含义

对象的含义是指具体的某一个事物，即在现实生活中能够看得见摸得着的事物。在面向对象程序设计中，对象所指的是计算机系统中的某一个成分。在面向对象程序设计中，对象包含两个含义，其中一个是**数据**，另外一个是**动作**。**对象则是数据和动作的结合体。对象不仅能够进行操作，同时还能够及时记录下操作结果**。


### 46. flex:1   = >   flex: 1; === flex: 1 1 auto;
```css
      /* 1. flex-grow 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大 */
      /* flex-grow: 0.6; */
      
      /* 2. flex-shrink 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小(如果在空间不足的前提下 越小代表其越大) */
      /* flex-shrink: 0.6; */
      /* flex: 1; */
      
      /*  3. flex-basis的默认值是auto，表示自动，也就是完全根据子列表项自身尺寸渲染。
      自身尺寸渲染优先级如下：
      min-width > || max-width > width > Content Size */

      /* flex-basis优先级是比width高的（可以理解为覆盖）。 */
      /*这里真实的宽度是300 因为有flex-basis限制*/
      width: 500px;
      flex-basis: 300px;
````

### 47. css 实现三角形

```javascript
.tt {
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-left-color: black;
}
```

### 48. img 标签和 background-image
引用：https://tinycat2017.github.io/2018/05/08/background-image-%E5%92%8C-img-%E6%A0%87%E7%AD%BE%E7%9A%84%E5%8C%BA%E5%88%AB/

1. 占位
对于background-image来说，它只是一个 CSS 的特性，虽然能展示图片，但是它并不占位，而 img 标签是占位，img 标签是一个 HTML 的元素，在 DOM 结构中是会存在它的位置。
因此通常像背景图片之类的，并不需要占位的，使用background-image 会更好。
而且很有趣的一点是，在默认情况下，如果我们打印页面，如果需要把图片也被包含着打印出来，我们需要使用 img 标签而不是 background-image。
2. 语义化
我们可以给 img (含有 alt 属性) 标签渲染的图片赋予其语义，比如像错误图标之类的，这样可以给浏览器传达图像的含义。
在前端比较关注的 SEO 问题上，img 语义很清晰
3. 图片动画实现
img标签比background-image动画性能上有优势 尤其是在移动端
4. 加载顺序
对于 img 标签来说，需要等到图片渲染出来之后浏览器才能进行下一步页面渲染，而 background-image 的加载方式是先让浏览器去加载页面，待页面元素加载完成之后，浏览器再去加载 background-image 的图片。
5. 可操作性
img 标签是渲染到页面中的 DOM 元素，因此可以对它使用 DOM 操作，比如监听一个事件

### 49. web 中图片加载时机
引用：https://segmentfault.com/a/1190000010032501

1. 大致流程

* 解析HTML【遇到<img>标签加载图片】 —> 构建DOM树
* 加载样式 —> 解析样式【遇到背景图片链接不加载】 —> 构建样式规则树
* 加载javascript —> 执行javascript代码
* 把DOM树和样式规则树匹配构建渲染树【遍历DOM树时加载对应样式规则上的背景图片】
* 计算元素位置进行布局
* 绘制【开始渲染图片】

2. 设置了display:none属性元素的子元素，样式表中的背景图片不会渲染出来，也不会加载；而<img>标签的图片不会渲染出来，但会加载（发起请求）


### 50. script 中的defer和async执行时机
首先两者的下载都是异步进行。如果没有加这俩标签脚本会立刻下载并执行。两者区别在于执行的时机
1. derfer 会在文档加载完之后去执行
2. async是在脚本下载完去执行


### 51. js引擎
google => v8   apple => javascriptcore

### 52. 浏览器中的进程和线程
引用：https://segmentfault.com/a/1190000012925872

1. 进程（我们每打开一个标签页实际上会新开一个进程；当然浏览器也有内部优化不一定）
* 渲染进程（webkit）
* Browser进程：浏览器的主进程（负责协调、主控）这个只有一个
* 插件进程
* GPU进程：最多一个用于3D绘制

2. 渲染进程中的线程

* JS引擎线程
1> 也称为JS内核，负责处理Javascript脚本程序。（例如V8引擎）
2> JS引擎线程负责解析Javascript脚本，运行代码。
3> JS引擎一直等待着任务队列中任务的到来，然后加以处理，一个Tab页（renderer进程）中无论什么时候都只有一个JS线程在运行JS程序
4> 同样注意，GUI渲染线程与JS引擎线程是互斥的，所以如果JS执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞。

* GUI渲染线程
1> 负责渲染浏览器界面，**解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制等。**
2> 当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时，该线程就会执行
3> 注意，**GUI渲染线程与JS引擎线程是互斥的**，当JS引擎执行时GUI线程会被挂起（相当于被冻结了），GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。

* 事件触发线程
* 定时触发器线程
1> 传说中的setInterval与setTimeout所在线程
2> 浏览器定时计数器并不是由JavaScript引擎计数的,（因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确）
3> 因此通过单独线程来计时并触发定时（计时完毕后，添加到事件队列中，等待JS引擎空闲后执行）
注意，W3C在HTML标准中规定，规定要求setTimeout中低于4ms的时间间隔算为4ms。

* 异步http请求线程

### 52. link 和@import的区别
1. 从属关系区别
@import是 CSS 提供的语法规则，只有导入样式表的作用；link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。

2. 加载顺序区别
加载页面时，link标签引入的 CSS 被同时加载；@import引入的 CSS 将在页面加载完毕后被加载。

3. 兼容性区别
@import是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link标签作为 HTML 元素，不存在兼容性问题。

4. DOM可控性区别
可以通过 JS 操作 DOM ，插入link标签来改变样式；由于 DOM 方法是基于文档的，无法使用@import的方式插入样式。

5. 权重区别(该项有争议，下文将详解)
link引入的样式权重大于@import引入的样式。

### 53. css3常用属性

圆角（border-radius） 
阴影（box-shadow）
过渡效果（transition）
翻转（transform）
动画（animation）
媒体查询（@media）
弹性盒子（flex）

### 54. css动画 and js动画

css动画有一个重要的特性，它是完全工作在GPU上。因为你声明了一个动画如何开始和如何结束，浏览器会在动画开始前准备好所有需要的指令；并把它们发送给GPU。而如果使用js动画，浏览器必须计算每一帧的状态；为了保证平滑的动画，我们必须在浏览器主线程计算新状态；把它们发送给GPU至少60次每秒。除了计算和发送数据比css动画要慢，主线程的负载也会影响动画； 当主线程的计算任务过多时，会造成动画的延迟、卡顿。

所以尽可能地使用基于css的动画，不仅仅更快；也不会被大量的js计算所阻塞。


### 55. pwa(渐进式WEB应用)
1. 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
2. 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
**service worker**
* HTTP缓存
Web 服务器可以使用 Expires 首部来通知 Web 客户端，它可以使用资源的当前副本，直到指定的“过期时间”。反过来，浏览器可以缓存此资源，并且只有在有效期满后才会再次检查新版本。
使用 HTTP 缓存意味着你要依赖服务器来告诉你何时缓存资源和何时过期。

* service worker缓存
Service Workers 的强大在于它们拦截 HTTP 请求的能力
进入任何传入的 HTTP 请求，并决定想要如何响应。在你的 Service Worker 中，可以编写逻辑来决定想要缓存的资源，以及需要满足什么条件和资源需要缓存多久。一切尽归你掌控！

3. 实现了消息推送

### 56. vite 和webpack
1. webpack会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。
而vite是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。
2. 由于现代浏览器本身就支持ES Module，会自动向依赖的Module发出请求。vite充分利用这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像webpack那样进行打包合并。
3. 由于vite在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，vite的优势越明显。
4. 在HMR方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不像webpack那样需要把该模块的相关依赖模块全部编译一次，效率更高。
5. 当需要打包到生产环境时，vite使用传统的rollup进行打包，因此，vite的主要优势在开发阶段。另外，由于vite利用的是ES Module，因此在代码中不可以使用CommonJS


### 57.WEBGL
WebGL是一套API，实际上WebGL是一种3D绘图标准，这种绘图技术标准允许把JavaScript和OpenGL ES 2.0结合在一起，通过增加OpenGL ES 2.0的一个JavaScript绑定，WebGL可以为HTML5 Canvas提供硬件3D加速渲染，这样Web开发人员就可以借助系统显卡来在浏览器里更流畅地展示3D场景和模型了，还能创建复杂的导航和数据视觉化
OpenGL API是一套接口，学习这套接口，就可以在那些支持OpenGL的机器上正常使用这些接口

### 58. 跨域

引用：https://zhuanlan.zhihu.com/p/132534931
1. jsonp 
利用script标签不受同源策略影响的策略
```javascript
 <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);

    // 回调执行函数
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }
 </script>
```
2. CROS
跨域资源共享(CORS) 是一种机制，它使用额外的HTTP头来告诉浏览器 让运行在一个 origin (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

3. 代理转发(ngnix)
Nginx 则是通过反向代理的方式，（这里也需要自定义一个域名）这里就是保证我当前域，能获取到静态资源和接口，不关心是怎么获取的。nginx 安装教程

4. window.name
通过 iframe 的 src 属性由外域转向本地域，跨域数据即由 iframe 的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

5. 浏览器可以通过某些方式将同源策略取消
6. window.postmessage()
概念：window.postMessage()方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。
用途：
* 页面和其打开的新窗口的数据传递
* 多窗口之间消息传递
* 页面与嵌套的 iframe 消息传递
7. websocket 



### 58.1 同源策略的限制
协议+域名+端口  必须一致才是同源策略；这是一种安全策略。有以下限制
1. cookie 、LocalStorage无法获取
2. ajax请求无法发送
3. Dom和js对象没有办法获取


### 59. 伪元素和伪类
> 伪元素：（伪元素用于创建一些不在文档树中的元素，并为其添加样式）一般用双冒号

* ::before
* ::after

> 伪类：（伪类用于当已有元素处于的某个状态时，为其添加对应的样式）一般用单冒号

1. 状态相关
* :link用于选择未访问的链接
* :visited用于选择已访问的链接
* :hover用于选择鼠标指针浮动在其上的元素
* :focus用于选择获取焦点的输入字段

2. 结构化相关
* : first-child用于匹配元素的第一个子元素。
* : last-child用于匹配元素的最后一个子元素。
* : nth-child根据元素的位置匹配一个或者多个元素，它接受一个an+b形式的参数，an+b匹配到的元素示例如下：
          1n+0，或n，匹配每一个子元素。
          2n+0，或2n，匹配位置为2、4、6、8…的子元素，该表达式与关键字even等价。
          2n+1匹配位置为1、3、5、7…的子元素、该表达式与关键字odd等价。
          3n+4匹配位置为4、7、10、13…的子元素。
```css
        //初始值是1 第一个元素
        .btn li:nth-child(1) {
            background-color: burlywood;
        }
```

> 共同点和不同点
1. 伪元素和伪类都不会出现在源文档或者文档树中
2. 伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档数外的元素



### 60. vue 和react的 虚拟DOM  / diff算法 
虚拟DOM=》使用状态生成虚拟节点，然后再使用虚拟节点渲染视图。加上虚拟节点这一层是因为：
1. 状态直接转化DOM一定程度会造成性能浪费
2. 有了虚拟节点我们可以缓存旧的节点。根据diff算法对比的结果精准有效更新DOM
3. **使用JS代码的计算成本换取Dom操作成本**

首先两者是diff算法使用的深度优先遍历  时间复杂度是O(n)
1.  实现的难度和效率以及逻辑的复杂性方面都是深度优先比较好
2.  四种节点对比方式  新前和旧后 、新后和旧前、 新前和旧前、新后和旧后

> key 的作用

框架内部维护了一个key和index的映射。如果绑定了key会直接通过这个映射找到对应的节点。避免了循环遍历去取的消耗

### 61. merge 和 rebase的区别
（两者都是实现合并其它分支到当前分支）
* merge 
1. 会产生新的commit(merge commit)
2. 记录了真实的commit情况，包括每个分支的详情
* rebase（变基）
1. 不会产生新的commit。会合并之前的commit历史

