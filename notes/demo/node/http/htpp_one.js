const http = require('http');

// 创建服务器
let server = http.createServer();

//随便定义的一个函数，下面会用到
function a() {
    console.log("dajiahao");
}


//  基于事件 很多的on('xxx')
server.on('request', (req, res) => {
    // req  是只读
    // res 是只写对象 调函数
    console.log(req.url);

    // 写头  1一次性写  2 多次写
    res.setHeader('a', 'a');
    res.setHeader('b', 'b');
    res.setHeader('c', 'c');
    // 一次性写一定要在多次写的后面
    // res.writeHeader(200,{'d':'d'});
    // 写行
    res.writeHeader(200, {
        'content-type': 'text/html;charset=utf-8'
    });

    // 写体
    res.write('窗前明月光<br>');
    res.write('疑是地上霜<br>');
    // 不管请求什么都返回同一个数据
    res.end('李白');
});

//显示了三次这也证明了TCP的三次握手
server.on('connection', () => {
    a();
});

// ip 找计算机  端口找程序
server.listen(8888, () => {
    console.log('服务器在8888端口启动了');
});