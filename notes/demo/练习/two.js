// const aa = require('./one.js');
// aa.aa();
const http = require('http');

var app = http.createServer();

function fn() {
    console.log('kkkkkkkk');
}
app.on('request', (req, res) => {
    console.log(req.url);
    // 写头
    res.setHeader('a', 'a');
    res.setHeader('b', 'b');
    res.setHeader('c', 'c');

    // 写行
    res.writeHeader(200, {
        'content-type': 'text/html;charset=utf-8'
    });
    // 写体
    res.write('窗前明月光');
    res.write('疑是地上霜<br>');
    res.end('李白');
})


// 显示三次tcp 请求
app.on('connection',()=>{
    fn();
})

app.listen(4444, () => {
    console.log('4444端口已经被占用');
})