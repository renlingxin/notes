// 路由分为前端路由和后端路由
// 后端路由就是 请求方式与url的不同，返回不同的结果


// 1: 引入express(快速开发服务器) 第三方插件
const express = require('express'); //自动逐级向上查找


// 2：构建一个服务器对象
let app = express();

   // 获取路由中间件对象   let router = express.Router();
   let router = express.Router();
   // 配置路由规则  router.请求方式（url,fn）
   router.get('/login', (req, res) => {
    res.end('login page');
   });
   router.get('/register', (req, res) => {
    res.end('register page');
   });
   
app.use(router);//关联调用

// 3：开启服务器监听端口
app.listen(5656);

