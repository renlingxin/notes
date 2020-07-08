
// <!-- 设计两个接口   返回index.html
// /test 只用write  不用 end  =>   默认来讲  页面会一直转   但是用ajax
const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    // console.log(req);
    if (req.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end(data);

        });
    } else if (req.url === '/test' && req.method === 'GET') {
        //告知客户端可以一点一点显示

        res.writeHead(200, {
            'content-type':'application/octet'
        });
        // Date.now()   返回的是当前时间的毫秒数
        setInterval(function () {
            res.write('' + Date.now()+'^_^');
        }, 1000);
    }
}).listen(9999,()=>{
    console.log('9999端口已占用')
});