// 1: 引入express(快速开发服务器) 第三方插件
const express = require('express'); //自动逐级向上查找


// 2：构建一个服务器对象
let app = express();

// 3：开启服务器监听端口
app.listen(5555);


// 4：处理响应
// 1: app.use 是请求与响应中执行的一件事，按代码顺序执行
// 2：next();函数调用是放行到下一件事
// 3： 如果全next 最终没有end页面数据，框架帮我们处理      status  404

// 用户选择性url开头的部分 ，选择性调用对应的事
app.use('/sucai',(req, res,next) => { 
    console.log('萝卜');
    next();//放行
});
app.use('/sucai',(req, res,next) => { 
    console.log('白菜');
    next();
});
app.use('/hucai',(req, res,next) => { 
    console.log('牛肉');
    next();
});
app.use('/hucai',(req, res,next) => { 
    console.log('羊肉');
    next();
});