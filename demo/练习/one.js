const http = require('http');
const fs = require('fs');
const url = require('url');
var server = http.createServer((req, res) => {
    console.log(req.url)
    var rr = url.parse(req.url);
    console.log(rr);
    var pathname = rr.pathname;
    if (pathname === '/') {
        res.writeHead(200, {
            'content-type': 'text/plain;charset=utf-8'
        })
        // res.writeHead(200, {
        //     'content-type': 'text/plain;charset=utf-8'
        // });
        // res.writeHead(200, {
        //     'content-type': 'text/plain;charset=utf-8'
        // })
        // res.writeHead(200, {
        //     'content-type': 'text/plain;charset=utf-8'
        // })
        // res.writeHead(200, {
        //     'content-type': 'text/plain;charset=utf-8'
        // })
// res.writeHeader(200,{'content-type':'text/plain;charset=utf-8'})

        res.write('欢迎欢迎');
    } else if (pathname === '/index.html') {
        var con = fs.readFileSync('./view/index.html', 'utf-8');
        res.write(con);
    }
    res.end('hello world!');
});
server.listen(8888, () => {
    console.log('8888端口已经被占用了')
})

function aa() {
    console.log('aaaaaaaa');
}
module.exports = {
    aa: aa
};