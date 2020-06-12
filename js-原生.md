## 原生
### 一、document.createElement
概念：Document.createElement() 方法用于创建一个由标签名称 tagName 指定的 HTML 元素。如果用户代理无法识别 tagName，则会生成一个未知 HTML 元素 HTMLUnknownElement。
```javascript
        let _input = document.createElement('input')
        document.body.appendChild(_input)
        document.body.removeChild(_input)
```
### 二 、appendChild()
概念：appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
```html
<body>
    <ul id="user">
        <li>1111</li>
        <li>2222</li>
        <li>3333</li></ul>
    <div id="child"><li>3333</li></div>
</body>
<script>
let _user = document.getElementById('user').lastChild //lastChild 属性返回被选节点的最后一个子节点。
let _child  =document.getElementById('child')
console.log(_user) //<li>3333</li>
_child.appendChild(_user)
</script>
```
### 三、addEventListener ,removeEventListener() IE（attachEvent,detachEvent）
概念：addEventListener() 方法用于向指定元素添加事件句柄。
用法：element.addEventListener(event, function, useCapture) 
event => 事件名   function => 事件触发执行的函数  useCapture => 是否在事件冒泡阶段执行  true 捕获阶段 false 冒泡阶段
```javascript
    _button.addEventListener('click', function () {
        window.location.reload()
    })
```
### 四 、importNode()
importNode() 将外部文档的一个节点拷贝一份
```javascript
    // 获取template
    let _tem = document.querySelector('#templates')
    let hr = document.createElement('hr')
    // content 获取template中的内容
    let _div = _tem.content.querySelector('div')
    _div.appendChild(hr)
    let clone = document.importNode(_div,true) // 两个参数 分别是拷贝的对象 
    document.body.appendChild(clone)
```

#### event 事件名扩展
一 鼠标事件
1. click
2. mousedown
3. mouseup
4. dbclick  双击事件
5. mouseenter  鼠标指针移动到元素上时触发
6. mouseleave  鼠标指针移出元素时触发
7. mousemove  鼠标被移动
8. mouseover  鼠标移到某元素之上
9. mouseout  鼠标从某元素移开
10. mouseup  鼠标按键被松开
二  键盘事件
1. keydown 某个键盘按键被按下
2. keyup 某个键盘按键被松开
3. keypress 键盘按下并松开
三 表单事件
1. blur 元素失去焦点
2. change 元素内容改变时触发
3. focus 获取焦点触发
4. input 元素获取用户输入触发
5. reset 表单重置触发
6. search 用户向搜索域输入时触发
7. submit 表单提交触发
四 其他事件
1. storage 该事件在 Web Storage(HTML 5 Web 存储)更新时
2. popstate 该事件在窗口的浏览历史（history 对象）发生改变时触发。
### 四、事件对象
属性：
1. bubbles 事件是否是冒泡事件类型
2. cancelable 事件是否可以取消默认行为
3. currentTarget 返回事件监听器触发该事件的元素
4. eventPhase 事件传播的当前阶段 0，1，2，3 分别是事件没有被处理，事件被目标父级元素处理（事件捕获），事件处于当前目标，事件处于冒泡阶段
5. target 触发此事件的元素，目标节点
6. timeStamp 事件生成的日期（时间戳-毫秒级别-距离该页面打开时间的大小）
7. type 当前event对象表示的事件名称
8. isTrusted 指明事件是否是由浏览器（当用户点击实例后）或者由脚本（使用事件的创建方法，例如event.initEvent）启动。

方法：
1. initEvent() 初始化新创建的event对象的属性

2. preventDefault() 阻止默认行为

3. stopPropagation()阻止事件冒泡

### 五、节点操作
**lastchild** 获取子节点的最后一个
**firstchild**  获取子节点中的第一个
**childNodes**  获取子节点集合
**appendChild**  追加节点
**removeChild**   移除节点


### 六、api再实现
**1. arr.reverse**
```javascript
Array.prototype.againReverse = function () {
    let _len = this.length
    let _reset = []
    for (let i = 0; i <= _len - 1; ++i) {
        _reset[_reset.length] = this[_len - i - 1]
    }
    for (let j = 0; j <= _len - 1; ++j) {
        this[j] = _reset[j]
    }
    return this
}
```
### 七、window对象

**MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/ **

#### 一 、window事件

1. **unhandledrejection**
当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；

```javascript
//reason   传入异常处理方法的错误原因
window.addEventListener("unhandledrejection", event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});
window.onunhandledrejection = event => {
  console.log(event.reason)
}
```
2. **window.onpopstate**
window.onpopstate是popstate事件在window对象上的事件处理程序
如果记录是pushstate或replacestate操作过的,onpopstate会包含一个拷贝

```javascript
window.onpopstate = function (event) {
  alert('location:' + document.location + 'state:' +   JSON.stringify(event.state))
}
history.pushState({
    page: 1
}, 'title1', '?page=1')
```

#### 二、window属性
1. **window.location**
只读属性 返回当前为包含当前位置信息的对象
```javascript
window.localhost => 
    assign: function assign()
    hash: "" //哈希值
    host: "localhost:8080" //主机名=端口
    hostname: "localhost" //主机名
    href: "http://localhost:8080/ad/create/kuaishou" //地址
    origin: "http://localhost:8080"  //起源
    pathname: "/ad/create/kuaishou" //路径名
    port: "8080"  //端口
    protocol: "http:" //协议
    reload: function reload() //强制从服务器更新
    replace: function replace() //替换
    search: "" //参数 ？
    toString: function toString()
    valueOf: function valueOf()
    Symbol(Symbol.toPrimitive): undefined
```

```javascript
    //直接赋值 浏览器回跳转到对应页面
    window.location = 'http://pre.adsdesk.cn'
    // 和直接赋值效果一样
    window.location.assign('http://pre.adsdesk.cn')
```

```javascript
//强制从服务器刷新当前页面
window.location.reload(true);
```

```javascript
window.location.search = 'Some&& ?Data大的'
// window.localhost => file:///C:/Users/admin/Desktop/demo/native/index.html?Some&&%20?Data%E5%A4%A7%E7%9A%84  空格会在展示的时候转化为URI格式
decodeURI('file:///C:/Users/admin/Desktop/demo/native/index.html?Some&&%20?Data%E5%A4%A7%E7%9A%84')
//"file:///C:/Users/admin/Desktop/demo/native/index.html?Some&& ?Data大的"
```
2. **window.navigator **
当前代码的应用程序的相关信息。

```javascript

window.navigator.appName //appName 属性返回浏览器的应用程序名称
window.navigator.appCodeName //appCodeName  属性返回浏览器的应用程序代码名称
window.navigator.product //product 属性返回浏览器引擎的产品名称
window.navigator.appVersion //appVersion 属性返回有关浏览器的版本信息
window.navigator.userAgent //userAgent 属性返回由浏览器发送到服务器的用户代理报头（user-agent header）

```

## 	H5
### 一、template

HTML内容模板（template）元素是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以(原文为 may be)在运行时使用JavaScript实例化。

将模板视为一个可存储在文档中以便后续使用的内容片段。虽然解析器在加载页面时确实会处理template元素的内容，但这样做只是为了确保这些内容有效；但元素内容不会被渲染。

HTMLTemplateElement 有个属性： content , 这个属性是只读的DocumentFragment 包含了模板所表示的DOM树。

```javascript
    // 获取template
    let _tem = document.querySelector('#templates')
    let hr = document.createElement('hr')
    // content 获取template中的内容
    let _div = _tem.content.querySelector('div')
    _div.appendChild(hr)
    let clone = document.importNode(_div,true)
    document.body.appendChild(clone)
```