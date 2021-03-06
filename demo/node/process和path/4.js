// 核心对象 Path
//  引入：const path = require('path');
//  路径：在处理路径的时候很擅长，但是，他不负责判断路径是否存在文件



const path = require('path');   //path 在node.exe里面

// 3段路径来自不同的用户的输入  拼接并修正路径：path.join(__dirname,'a','b'),以当前目录+/a/b;

const myPath =path.join(__dirname,'/one','/two','/three');
console.log('myPath',myPath);

// 根据相对路径  返回绝对路径   对程序说  ./xxx.js非要一个绝对路径
const str ='./abc/efg.js';
let temp =path.resolve(str);
console.log('temp',temp);
// 接收一个合法路径，转换成一个对象   path.parse() 方法返回一个对象
 let pathObj = path.parse(myPath)
 console.log('pathObj',pathObj);
 pathObj.base = 'three.txt';
 console.log('pathObj',pathObj);
// 接收路径对象，转换成一个字符串路径
let pathObj1 = path.format(pathObj)
 console.log('pathObj1',pathObj1);





// 扩展
// 1、相对路径-顾名思义，相对路径就是相对于当前文件的路径。网页中一般表示路径使用这个方法。

// 2、绝对路径-绝对路径就是你的主页上的文件或目录在硬盘上真正的路径。绝对路径就是你的主页上的文件或目录在硬盘上真正的路径，比如，你的Perl 程序是存放在 c:/apache/cgi-bin 下的，那么 c:/apache/cgi-bin就是cgi-bin目录的绝对路径

// 在网络中，以http开头的链接都是绝对路径，绝对路径就是你的主页上的文件或目录在硬盘上真正的路径，绝对路径一般在CGI程序的路径配置中经常用到，而在制作网页中实际很少用到。
// 二、相对路径使用的特殊符号

// 以下为建立路径所使用的几个特殊符号，及其所代表的意义。

// “./”：代表目前所在的目录。

// “../”：代表上一层目录。

// 以”/”开头：代表根目录。

// 绝对路径的优点

// A、如果有人抄袭你的网站内容，里面的链接还会指向你的网站，
// 如果有人将你的网页保存到本地电脑中，里面的链接、图片、css、
// 以及js仍然会连接到你的网站。
// B、如果网页位置改变，里面的链接还是指向正确的URL。

// 2、绝对路径的缺点：

// A、在编码编写时不方便使用绝对路径，因为链接应该指向真正的域名而
// 不是开发站点。
// 相对路径的优缺点和绝对路径几乎相反。

// 3、相对路径的优点：

// A、容易移动内容，可以整个目录移动。
// B、测试方法比较灵活，本机测试时比较方便。

// 4、相对路径的缺点：

// A、部分内容页面换了位置时，链接容易失效。
// B、容易被人大面积采集抄袭。
// 五、相对路径和绝对路径在系统文件中与在网络中类似，文件的路径符号是斜线“/”，而网络路径却是和它相反的反斜线“/”