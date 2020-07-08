const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./view/index.html', (err, data) => {
            res.writeHeader(200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end(data);
        })
    } else if (req.url === '/text' && req.method == 'GET') {
        // 一步步加载
        res.writeHeader(200, {
            'content-type': 'application/octet'
        });

        // 一直执行    setTimeout  是执行一次
        setInterval(() => {
            res.write(Date.now() + '^_^')
        },1000);

    }







}).listen(3333, () => {
    console.log('3333端口已经被占用');
});