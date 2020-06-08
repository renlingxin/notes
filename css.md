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
二者都是隐藏元素，但是display:none后元素在页面中不占位置；visibility:hidden依然在页面中占据位置
## html
#### 转义字符
| 字符   | 十进制 |     转义字符 |
| :----- | :--: | -------: |
| " |  &#34;  | &quot; |
| & |  &#38;   | &amp; |
| < |  &#60;   | &lt; |
| > |  &#62;   | &gt; |
| 不断开空格(non-breaking space) |  &#160;   | &nbsp; |

### 五  、 css样式继承