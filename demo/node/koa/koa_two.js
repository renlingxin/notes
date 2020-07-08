// request 和 response

const Koa = require('koa');

let server1 = new Koa();

server1.use((context, next) => {
    // console.log(context.request.url);
    // console.log(context.request.method);
    // console.log(context.request.headers);


    console.log(context.url);
    console.log(context.method);
    console.log(context.headers);
    next(); //放行
}); //请求与响应之间发生的一件事

server1.use((ctx) => {
    console.log('第二件事');
    // 响应头  状态码 体 
    // ctx.response.set('mytest', '123456');
    // ctx.response.status = 200;
    // ctx.response.body = '<h1>hello world !</h1>';

    ctx.set('mytest', '123456');
    ctx.status = 200;
    ctx.body = '<h1>hello world !</h1>';
})
server1.listen(1555, () => {
    console.log('koa 启动在1555端口')
})