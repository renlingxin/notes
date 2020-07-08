// 导入常用的三个内置模块

var http = require('http'),
    fs = require('fs'),
    url = require('url');//URL模块中提供了一个方法url.parse()用来解析URL地址


// 1 http
// http.createServe:创建一个服务,变量server就是我们创建的那个服务
// server.listen   为这个服务监听一个端口
var server = http.createServer(function (request, response) {
    // 这是一个回调函数   当客户端向服务器端的当前服务发送一个请求时，并且当前服务成功接收到请求后执行这个回调函数
    // http://localhost/index.html?name=renlingxin&age=7  输出的结果：/index.html?name=renlingxin&age=7
    // 服务创建成功后 ，如何向服务器端发送请求
        //    1 在浏览器中输入  http://localhost:端口号/
        //    2 在浏览器中输入 http://本机ip地址:端口号/
        // 成功后 还传递回两个值
        // request(请求)      存放的是所有客户端的请求信息，包含客户端通过问号传参的方式传递给服务器的数据内容
        //     request.url    存放的是客户端请求的文件资源的目录和名称以及传递给服务器的数据
        // response(响应)  提供了向客户端返回内容和数据的方法
    console.log(request.url);
    var urll = url.parse(request.url, true),
        pathname = urll.pathname,
        query = urll.query;
    console.log(urll);
    // 根据请求的URL地址（具体的是根据地址中的pathname）获取到对应的资源文件中的源代码
    // fs.rendFileSync  同步读取指定文件夹中的内容（同步读取：文件中的内容读取不完不执行下面的操作）
    if (pathname === '/1.html') {
        var con = fs.readFileSync('./1.html', 'utf-8');
        // response.write  向客户端返回内容
        // response.end()   告诉服务器响应结束  一定加
        response.write(con);
        response.end();
        
    }

});


server.listen(80, function () {
    // 当端口号监听成功之后执行 这是一个回调函数
    console.log('server is create success ~,listening on 80 port!')
});