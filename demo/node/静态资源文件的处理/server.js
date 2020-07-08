var http = require('http'),
    url = require('url'),
    fs = require('fs');
// 创建一个服务
var server1 = http.createServer(function (req, res) {
    // res.write('renlingxin');
    // res.end();
    // 解析客户端请求地址中的文件目录名称以及传递给当前服务器的数据内容
    var urlobj = url.parse(req.url, true),
        pathname = urlobj['pathname'],
        query = urlobj['query'];
    // if (pathname === '/index.html') {
    //     // readFile   =  默认异步
    //     var con = fs.readFileSync('./index.html','utf-8');
    //     res.end(con);//先返回再结束  两步操作合到一起
    //     return;
    // }
    // if(pathname === '/css/index.css'){
    //     con = fs.readFileSync('./css/index.css','utf-8');
    //     res.end(con);
    //     return;
    // }
    // if(pathname === '/js/index.js'){
    //     con = fs.readFileSync('./js/index.js','utf-8');
    //     res.end(con);
    //     return;
    // }
    // 处理静态资源文件的请求 (html/css/js)   =》前端路由
    var reg = /\.(HTML|CSS|JS|JSON|TXT|ICO)/i;
    if (reg.test(pathname)) {
        //获取请求文件的后缀名
        var suffix = reg.exec(pathname)[1].toUpperCase();
        //根据请求文件的后缀名获得当前文件的类型
        var suffixMIME = 'text/plain';//默认是txt
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/js';
                break;
            case 'JSON':
                suffixMIME = 'text/json';
                break;
            case 'ICO':
                suffixMIME = 'image/x-icon';
            break;
        }
        //按照指定的目录读取文件中的内容（读取代码  内容都是字符串格式的）
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            // 重写响应头信息：告诉客户端的浏览器我返回的内容是什么样的mime类型
            //指定返回的内容格式是utf-8,返回的中文就不是乱码了
            res.writeHead(200, { 'content-type': suffixMIME + ';charset=utf-8' });
            //服务器端向客户端返回的也是字符串
            res.end(conFile);
        } catch (e) {
            res.writeHead(404, { 'content-type': 'text/plain;charset=utf-8' });
            res.end('没找到文件');
        }

    }

    // 如果客户端请求的资源文件不存在，我们不加   服务会终止，加上他服务不会报错，不会终止
    // try catch   捕获异常
    // try {
    //     var con = fs.readFileSync('.' + pathname, 'utf-8');
    //     res.end(con);
    // } catch (e) {
    //     res.end('request is not find~')
    // }

});
// 为当前的这个服务配置端口
server1.listen(80, function () {
    console.log('success')
});