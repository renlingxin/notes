### 切换淘宝镜像
##### npm 方式
```
  npm get registry   //得到当前的镜像地址
  npm install -g cnpm --registry=https://registry.npm.taobao.org   //安装cnpm
  npm config set registry https://registry.npm.taobao.org    //切换淘宝镜像
  cnpm install [name]    //使用cnpm命令安装模块
  npm install express@12.2.0 //安装指定版本
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

### npm 发布版本

文章链接：
https://blog.csdn.net/znyaiw/article/details/80199457
https://blog.csdn.net/weixin_40817115/article/details/90384398

版本号格式：主版本号.次版本号.修订号
版本号递增规则：
- 主版本号：做了不兼容修改或颠覆式的重写
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正


```javascript

  //管理版本号常用命令
  major: 主版本号
  premajor: 预备主版本
  minor: 次版本号
  preminor: 预备次版本
  patch: 修订号
  prepatch: 预备修订版
  prerelease: 预发布版本
  
```

1. npm version prerelease

```javascript

npm version prerelease
package.json 中的版本号1.0.0变为 1.0.1-0
再次执行 npm version prerelease
package.json 中的版本号1.0.1-0变为 1.0.1-1

```

> 5,6操作说明 当执行npm version prerelease时，如果没有预发布号，则增加minor，同时prerelease 设为0；如果有prerelease， 则prerelease 增加1。


2. npm version prepatch

```javascript

  npm version prepatch
  package.json 中的版本号1.0.1-1变为 1.0.2-0

```

> prepatch - 直接升级小号，增加预发布号为0。

3. npm version preminor

```javascript

  npm version preminor
  package.json 中的版本号1.0.2-0变为 1.1.0-0

```

> preminor - 直接升级中号，小号置为0，增加预发布号为0。

4. npm version premajor

```javascript

  npm version premajor
  package.json 中的版本号1.1.0-0变为 2.0.0-0

```
> premajor - 直接升级大号，中号、小号置为0，增加预发布号为0。

5. npm version patch

```javascript
  npm version patch
  package.json 中的版本号2.0.0-0变为 2.0.0;

  再次执行npm version patch
  package.json 中的版本号2.0.0变为 2.0.1;
```

> patch：如果有prerelease ，则去掉prerelease ，其他保持不变；
如果没有prerelease ，则升级minor.

6. npm version minor

```javascript
  npm version minor
  package.json 中的版本号2.0.1变为 2.1.0;
```
>如果没有prerelease，直接升级minor， 同时patch设置为0；

### package.json

1. dependencies 和 devDependencies 
   devDependencies 是一些在开发环境需要用到的
   dependencies 是生产环境需要的
   peerDependencies -- 开发插件是 插件所依赖的包
    ** peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。**
2. 

- `^`：比如`^1.2.5`，代表版本范围`1.*.*`最新
- `~`：比如`~1.2.5`，代表版本范围`1.2.*` 最新

- 默认使用前缀`~`：`npm config set save-prefix '~'`
- 不使用前缀，保存确切版本 ：`npm config set save-exact true`







