//资源： https://baijiahao.baidu.com/s?id=1662842929861521073&wfr=spider&for=pc


/**
 * 请求和响应报文格式 --- 请求报文和响应报文的结构大体一致
 * 请求组成：请求行、请求头、空行、报文主体(可选的)
 * 1.请求报文 => 请求行(请求方法、URL、协议版本)
 * 2.请求头部 => 用于客户端和浏览器交流的其他信息 结构是键值对
 * 3.空行     => 结构是 一个回车符和一个换行符 不包含其他任何内容  用于标记请求头部已经结束
 * 4.报文主体  => 提交给服务器的数据 其格式由请求头部中的字段 Content-Type决定 
 *           例如 Content-Type:multipart/form-data; boundary=…45989416028等
 * 响应组成：状态行、响应头部、空行、报文主体(可选的)
 * 1.状态行 => 协议版本、状态码、和状态短语
 * 2.响应头部 => 和请求头部类似
 * 3.空行 => 结构是 一个回车符和一个换行符 不包含其他任何内容  用于标记响应头部已经结束
 * 4.报文主体 => 提交给服务器的数据 其格式由响应头部中的字段 Content-Type决定 
 */

// 常见响应头字段
/**
 * 1.Access-Control-Allow-Credentials	
 * 响应头表示是否可以将请求的响应暴露给页面，返回true可以，其他值都不可以
 */


/**
 * 2.option(预检请求)  -- 浏览器发送的用于向服务器请求权限信息 预检成功后 才会发起真正的http请求
 */
// 满足的触发条件 
//   （1）简单请求
//       1. HEAD GET POST
//       2. HTTP的头信息不超过以下几种字段 Accept Accept-Language Content-Language Last-Event-ID Content-Type(仅限于application/x-www-form-urlencoded multipart/from-data text/plain)
//   （2）复杂请求
//       非简单请求就是复杂请求，常见的复杂请求有
//       1.请求方法为PUT DELETE
//       2.Content-Type 字段类型为 application/json
//       3.添加额外的http header 比如 access_token
// 举例 -- 在CORS跨域的情况下，非简单请求会先发起一次空body的OPTIONS请求，称为预检请求。
//         与简单请求不同的是，option请求多了2个字段
//         Access-Control-Request-Method:该次请求的请求方式
//         Access-Control-Request-Headers:该次请求的自定义请求头字段
//         服务器的响应头字段也包含以上两个，内容是满足服务器要求的所有请求方式，请求头，不限于该次请求。
// 其他 -- CORS跨域中
//         请求头 origin:http://localhost:8080   (请求头origin为当前域)
//         响应头 Access-Control-Allow-Origin:http://localhost:8080  (标识允许哪个域的请求)


/**
 * 3.Connection(头 header) 决定当前的事务完成后，是否会关闭网络连接。
 *   （1）keep-alive HTTP/1.1的默认值 => 长连接 表明客户端想要保持网络连接打开（tcp连接不会关闭）用户再次访问这个服务器的网页，会继续使用这一条已经建立的TCP连接
 *    相较于http1.0 => http1.0每次请求都要创建连接 
 *   （2）close  HTTP/1.0的默认值 客户端或服务器想要关闭连接
 */

/**
 * 4.Content-Length(内容的长度-body的大小)  -- Content-Length:1076 (body的大小是1076B)
 */

/**
 * 5.Content-Type(实体头部用于指示资源的MIME类型)  -- 
 * 语法：Content-Type: text/html; charset=utf-8
 *      Content-Type: multipart/form-data; boundary=something
 * media-type  -- 资源或数据的MIME type（媒体类型）  charset -- HTML的字符编码标准   boundary -- 对于多部分实体，boundary是必需的
 * 常见媒体类型：
 * 1. test/html  -- 超文本标记语言
 * 2. text/plain -- 普通文本
 * 3. image/gif  -- GIF图形
 * 4. image/jpeg -- JPEG图形
 * 5. audio/basic -- au声音文件
 * 6. application/x-gzip -- GZIP文件   以application开头的一般是客户端自己定义的格式
 * 7. application/x-tar -- TAR文件
 * 常见编码方式：
 * 1.charset=iso-8859-1 -- 西欧的编码，英文编码
 * 2.charset=gb2312  -- 中文编码
 * 3.charset=utf-8 -- 世界通用语言编码
 * 4.charset=big5 -- 繁体中文编码
 * 5. charset=euc-kr -- 韩文编码
 */

/**
 * 6.X-RateLimit-Remaining(当前时间段内剩余的请求的数量)
 */


// 常见的请求头

/**
 * 1.Accept(告知服务端，客户端可以处理的内容类型) -- 内容是MIME类型
 *   与之相对应的是响应头 Content-Type （告知客户端，服务端的选择）	
 * 常见的值：
 * (1) 星/星 任意类型的MIME类型
 * (2) ;q= (q因子权重) 值代表优先顺序，用相对质量价值表示，又称作权重。
 */

/**
 * 2.Accept-Encoding	-- 声明浏览器支持的数据压缩类型
 */

/**
 * 3.Accept-Language	-- 表示浏览器所支持的语言类型  
 * zh-cn -- 表示简体中文  zh -- 中文
 * 例如：Accept-Language: zh-cn,zh;q=0.5  （q代表权重系数，范围0<=q<=1;默认值为1） -- 简体中文的权重高于中文
 */

/**
 * 4.Authorization	-- http安全请求首部，包含客户端提供给服务器 便于其对自身进行认证的数据
 * 如果 身份验证异常 浏览器会接受到401 -- 用户没有访问权限
 */

/**
 * 5.Referer	-- 携带访问的url地址  告诉服务器从哪个页面链接过来的
 */

/**
 * 6.User Agent	-- 中文名用户代理 => 内容是用户浏览器和操作系统的信息
 */

/**
 * 7.Host	-- http1.1 =》 请求网址的域名 决定访问哪个虚拟机 也就是站点 
 * 相较于http1.0 
 *   http1.0 => 默认每台服务器只绑定唯一的IP地址
 *   http1.1 => 由于虚拟 机技术的发现 同一台物理服务器可能会有多个虚拟主机 因此HTTP1.1支持了 HOST头域 可以传输响应的域
 * 举例：Host：test-api.adsdesk.cn
 */

/**
 * HTTP1.0 和 HTTP1.1 的区别
 * 1. Host
 *   http1.0 => 默认每台服务器只绑定唯一的IP地址
 *   http1.1 => 由于虚拟 机技术的发现 同一台物理服务器可能会有多个虚拟主机 因此HTTP1.1支持了 HOST头域 可以传输响应的域
 * 2.长连接
 *   Connection(头 header) 决定当前的事务完成后，是否会关闭网络连接。
 *  （1）keep-alive HTTP/1.1的默认值 => 长连接 表明客户端想要保持网络连接打开（tcp连接不会关闭）用户再次访问这个服务器的网页，
 *   会继续使用这一条已经建立的TCP连接  相较于http1.0 => http1.0每次请求都要创建连接 
 * 3.缓存
 * 在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，
 * If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
 * 4.增加了状态码
 *   HTTP1.1增加了24个错误状态响应码  如409（Conflict）表示请求的资源与资源的当前状态发生冲突；
 *   410（Gone）表示服务器上的某个资源被永久性的删除
 */

/**
 * HTTP 和 HTTPS 的区别
 * 1. HTTPS协议需要到CA申请证书，需要缴费
 * 2. HTTP协议运行在TCP之上，所有的传输的内容都是明文的  HTTPS运行在SSL/TLS之上，所有的传输都经过加密
 * 3. 端口不一样  HTTP 使用的80 HTTPS使用的443
 * 4. HTTPS有效防止了运营商劫持
 */



// function pre(name){
//   this.name = name
//   this.sayName = function(){
//     console.log(this.name)
//   }
// }
// let p1 = new pre('renlingxin')
// p1.sayName()



// const http = require('http')
// let xhr = http.createServer((req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'application/json;charset=utf-8',
//     'Access-Control-Allow-Origin': req.headers.origin,
//     'Access-Control-Allow-Methods': '*',
//     'Access-Control-Allow-Headers': '*',
//     'Access-Control-Allow-Credentials': true,
//     'Cache-Control': 'no-cache,no-store', // clear cache
//   })
//   res.end('nihao')
// })
// xhr.listen('1111', () => {
//   console.log('您的8000端口已经被占用')
// })

// let r= 0b100
// let w = 0b010
// let x = 0b001
// let user = 1
// console.log('user',user)
// console.log((user & 4) === 4)

