### 切换淘宝镜像
##### npm 方式
```
  npm get registry   //得到当前的镜像地址
  npm install -g cnpm --registry=https://registry.npm.taobao.org   //安装cnpm
  npm config set registry https://registry.npm.taobao.org    //切换淘宝镜像
  cnpm install [name]    //使用cnpm命令安装模块
```
##### nrm 方式
nrm是一个 npm registry 管理工具，nrm能够查看当前和切换当前使用的registry.最常用的还是切换淘宝镜像源。
```
  npm i nstall -g nrm   //安装nrm
  nrm ls    //查看registry
  nrm add 镜像名 镜像url // 添加镜像源
  nrm use taobao. //切换淘宝镜像
```
**在mac下安装 nrm 在命令行前加 sudo **
##### 插件 http-server
当代码中存在http和https链接时候，html页面无法正常打开，可以在本地开启一个本地服务器解决这个问题
```javascript
//下载方式
npm install http-server -g
//开启http-server服务
http-server
//简写 --- . 在当前文件夹 -o 在默认浏览器中打开页面 --- -p 设置端口为8080
hs . -o -p 8080
```
### 安装pm2

npm install pm2 -g
安装完成后，全局不会有pm2命令，这时你需要：

1. 找到全局环境PATH路径  echo $PATH   --- 
   效果：/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
2. ln -s /usr/local/node-v8.9.3-linux-x64/bin/pm2 /usr/local/bin/
   其中/usr/local/node-v8.9.3-linux-x64/bin/pm2为pm2的安装路径，在执行下载命令的下一行就有
   /usr/local/bin/为全局PATH路径

**指令**
$ pm2 start app.js # 启动app.js应用程序

$ pm2 start app.js -i 4 # cluster mode 模式启动4个app.js的应用实例 # 4个应用程序会自动进行负载均衡

$ pm2 start app.js --name=“api” # 启动应用程序并命名为 “api”

$ pm2 start app.js --watch # 当文件变化时自动重启应用

$ pm2 start script.sh # 启动 bash 脚本

$ pm2 list # 列表 PM2 启动的所有的应用程序

$ pm2 monit # 显示每个应用程序的CPU和内存占用情况

$ pm2 show [app-name] # 显示应用程序的所有信息

$ pm2 logs # 显示所有应用程序的日志

$ pm2 logs [app-name] # 显示指定应用程序的日志

$ pm2 flush

$ pm2 stop all # 停止所有的应用程序

$ pm2 stop 0 # 停止 id为 0的指定应用程序

$ pm2 restart all # 重启所有应用

$ pm2 reload all # 重启 cluster mode下的所有应用

$ pm2 gracefulReload all # Graceful reload all apps in cluster mode

$ pm2 delete all # 关闭并删除所有应用

$ pm2 delete 0 # 删除指定应用 id 0

$ pm2 scale api 10 # 把名字叫api的应用扩展到10个实例

$ pm2 reset [app-name] # 重置重启数量

$ pm2 startup # 创建开机自启动命令

$ pm2 save # 保存当前应用列表

$ pm2 resurrect # 重新加载保存的应用列表


### nodejs后端框架：
yog2(百度基于express)
eggjs(阿里出品基于koa)
koa
express
nestjs(angular风格)