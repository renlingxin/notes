// 1: 引入express 第三方插件
const express =require('express');//自动逐级向上查找


// 2：构建一个服务器对象
let server =express();

// 3：开启服务器监听端口
server.listen(4444);


// 4：处理响应
server.use((req,res)=>{//使用（请求与响应的过程中）
res.end('hello world');//原生api 
})