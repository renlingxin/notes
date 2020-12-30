var url = require('url');
var str = 'http://192.168.43.1:80/index.html?name=renlingxin&age=7';
console.log(url.parse(str)); //parse 解析 URL 字符串并返回 URL 对象

//   protocol: 'http:',    =>传递协议
//   slashes: true,
//   auth: null,
//   host: '192.168.43.1:80',  =>域名 + 端口
//   port: '80',   =>端口号
//   hostname: '192.168.43.1', =>域名(ip)
//   hash: null,   =>哈希值
//   search: '?name=renlingxin&age=7',  =>问号+传递进来的数据
//   query: 'name=renlingxin&age=7',    =>传递进来的数据 没有问号
//   pathname: '/index.html',           =>请求文件的路径及名称
//   path: '/index.html?name=renlingxin&age=7', =>路径名称+传递过来的数据
//   href: 'http://192.168.43.1:80/index.html?name=renlingxin&age=7' }
console.log(url.parse(str, true)); //增加true后，query是对象，内容已键值对的方式存储
var url = url.parse(str, true),
    pathname = url.pathname,
    query = url.query;
console.log(query);