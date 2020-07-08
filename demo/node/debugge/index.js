const http = require('http');
let app = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html'})
    res.end('hello world')
})
app.listen(3000,()=>{
    console.log('3000')
})