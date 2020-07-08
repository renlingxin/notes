// 需求 读取一个html文件 展示给用户显示

const fs = require('fs');
const Koa = require('koa');

let banner = new Koa();

function asyncReaFile() {
    return new Promise(function(resolve,reject){
        fs.readFile('./index.html', (err, data) => {
            // 1 失败，err  2 成功需要 data
            if(err) {
                reject(err);
                return;
            }
            // 成功
            resolve(data);    
        });
    });
}

// async(声明函数中有异步操作)  +  await(等待) = promise (三合一)
banner.use(async (ctx) => {  
    // 路由 判断 
    if (ctx.url === '/') { 
        // 响应首页
        let data = await asyncReaFile();
        // ctx.body = data; 控制台： Content-Type: application/octet-stream  express 智能的把二进制文件做成了下载
        //  1  ctx.body = data.toString();
        //  2  设置响应头
        ctx.set('content-type','text/html;charset=utf-8')
        ctx.body = data; 
       

        // fs.readFile('./index.html', (err, data) => {
        //     ctx.body = data;
        // });   这个方法单独不适用于这里
    } else {
        // ok
        ctx.body = 'ok!!';//如果是二进制数据就进行下载处理
    }


});

banner.listen(4444, () => {
    console.log('4444端口被占用了')
})