// 1 代码编写上避免了多层的嵌套异步函数调用 async await 来解决异步
//    async await 需要依赖于 promise
// 2 更轻 减少了内置中间件   express.static 处理静态资源的内置中间件 express.Router()路由
// 3 启动步骤
//  1 引入koa构造函数对象  const koa =require ('koa')
//  2 创建服务器示例对象 const app =new Koa();
//  3 配置中间件 app.use(做什么)
//  4 监听端口启动服务器 app.listen(5555);

// context 上下文对象 ：该对象类似原生http中的 req,res
//         该对象的req,res 属性也存在，就是原生没有包装过的 req res
//         简单说：context 对象居室从请求到响应 过程中的一个描述对象

//  next 函数 ：调用下一个中间件

// request(请求对象)：其中包含客户端请求的相关信息
// response(响应对象)：其中包含响应数据的具体操作



// express
const express = require('express');

let server = express();

server.use(function(req,res){
    res.end('express ok!')
});

server.listen(1212, () => {
    console.log('express 启动在1212端口')
})
// koa
const Koa = require('koa');

let server1 = new Koa();

server1.use(function(context){
    context.body = 'koa ok!'
});

server1.listen(1313, () => {
    console.log('koa 启动在1212端口')
})