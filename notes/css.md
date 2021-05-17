## CSS

### 一 、 --- vh的实际使用
```css
/*元素高度满屏显示*/
div{
   heigth:100vh;
}
```
### 二 、 css 属性通常可以设置的值
```css
initial --- 设置属性为他的默认值
inherit --- 继承父元素的属性值
unset --- 不设置，是关键字initial和inherit的组合
```
![xx](D:\mackdown\xx.png) 

![1588826354(D:\mackdown\1588826354(1).png)](C:\Users\admin\Desktop\1588826354(1).png)

### 三  、 超出部分隐藏  显示省略号等处理  css  

```css
.no-white{
    width:100px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
```
1. text-overflow   文本溢出包含元素的处理方式
      clip --- 修剪文本
      ellipsis --- 显示省略号代表隐藏的文本
      string --- 使用给定的字符串代表隐藏的文本
```css
text-overflow:'>>>'   //具有兼容问题  火狐浏览器能正常显示
```
2. white-space 如何处理元素中内的空白
       normal --- 默认，空白会被浏览器忽略
       pre --- 空白会被浏览器保留
       nowrap --- 文本不会换行，在一行上继续显示，知道遇到br
       pre-wrap --- 保留空白符序列，正常换行
       pre-line --- 合并空白符序列，保留换行符
       inherit --- 从父元素继承white-space属性的值
### 四  、 display:none和visibility:hidden的区别
二者都是隐藏元素，但是
display:none后元素在页面中不占位置；
visibility:hidden依然在页面中占据位置


### 五  、 cursor 属性

```css
    /* 鼠标旋转加载 */
    cursor: progress;
    /* 调大小的 上下 */
    cursor: row-resize;
    /* 四角的箭头 */
    cursor: move;
    /* 箭头带个问好 */
    cursor: help;
    /* 胖胖的小手 */
    cursor: grabbing;
    /* 舒展一点的小手 */
    cursor: grab;
    /* 箭头带个加号 */
    cursor: copy;
    /* 一个大的十字箭头 */
    cursor: crosshair;
    /* 胖胖的十字箭头 */
    cursor:cell;
    /* 放小镜 */
    cursor:-webkit-zoom-out;
    /* 放大镜 */
    cursor: -webkit-zoom-in;
    /* 旋转的圈圈 */
    ursor:wait;
```
### caret-color

```css
caret-color: #fece20; //caret-color属性用来定义插入光标（caret）的颜色，
```
### input tel

```html
<!-- 跟 在不支持的设备里 会默认使用text  -->
<!-- 尽管 tel 类型的输入在功能上和 text 输入一致, 但它们确实有用; 其中最明显的就是移动浏览器— 特别是在手机上 — 可能会选择提供为输入电话号码而优化的自定义键盘。使用 -->
<input type="tel" />

<style>
input::placeholder => 默认样式
</style>

```

### css 提升页面性能

链接：https://juejin.cn/post/6942661408181977118

1. content-visibility

* display: none：隐藏元素并破坏其渲染状态。 这意味着取消隐藏元素与渲染具有相同内容的新元素一样昂贵
* visibility: hidden：隐藏元素并保持其渲染状态。 这并不能真正从文档中删除该元素，因为它（及其子树）仍占据页面上的几何空间，并且仍然可以单击。 它也可以在需要时随时更新渲染状态，即使隐藏也是如此
* content-visibility: hidden：隐藏元素并保留其渲染状态。这意味着该元素隐藏时行为和display: none一样，但再次显示它的成本要低得多

* 适用场景  ---- 长列表渲染的时候


### 定位居中
1.
```javascript
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin:auto;
```
2.
```javascript
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
```









## html
#### 转义字符
| 字符   | 十进制 |     转义字符 |
| :----- | :--: | -------: |
| " |  &#34;  | &quot; |
| & |  &#38;   | &amp; |
| < |  &#60;   | &lt; |
| > |  &#62;   | &gt; |
| 不断开空格(non-breaking space) |  &#160;   | &nbsp; |


#### marquee 标签

### autofocus="autofocus"
文本输入字段被设置为当页面加载时获得焦点：

document.styleSheets






