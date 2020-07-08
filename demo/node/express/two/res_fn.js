// res  中的扩展函数
// res.json()   响应数据，最常用，返回的是ajax数据
// redirect()   重定向
// download()   下载
// jsonp()      跨域处理
// ETag: W/"17-LmGf2oKbB0Bae+yw4HydNjV6EMI"    控制过期时间

// 1: 引入express(快速开发服务器) 第三方插件
const express = require('express'); //自动逐级向上查找


// 2：构建一个服务器对象
let app = express();

// 1 获取路由中间件对象   let router = express.Router();
let router = express.Router();
// 2 配置路由规则  router.请求方式（url,fn）
router.get('/json', (req, res) => {   //content-type
    res.json([{name:'renlingxin'}]);//res.end 只能响应两种  string 和 读文件中的data Buffer

});
router.get('/redirect', (req, res) => {//res   =>  Location: http://www.baidu.com
    res.redirect('http://www.baidu.com')
});
router.get('/download', (req, res) => {
    res.download('./res_fn.js')//注意文件是如何被下载成功的
    // 基于服务器回写的content-type   等头信息
});
router.get('/jsonp', (req, res) => {//http://localhost:6868/jsonp?callback=jsonpcallback
    res.jsonp('ren love xie')

// 响应内容：/**/ typeof jsonpcallback === 'function' && jsonpcallback("ren love xie");



});


app.use(router); //关联调用

// 3：开启服务器监听端口
app.listen(6868,()=>{
    console.log('6868端口已被占用')
});