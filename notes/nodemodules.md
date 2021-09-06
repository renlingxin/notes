### 我们身边的 node_modules

## 引言
A某接收一个需求。需求是这样：” 升级 T (sdk) 以在 Q (App) 兼容  P项目 (h5)  “。是的需求很简单，理论上只需要升级A就可以。但是在实际的过程中并不轻松。列举一些case

1. 
> error报错触目惊心

> A某傻了 于是开始排查。在控制台的报错详情中 A某找到了一条至关重要的信息 也就是报错信息的来源于T/buff.js。A某发现buff.js实际是集成了一个功能。该功能是通过挂载window全局使用。里面这样的一行代码

```js

  init(){
    if(window.buff){
      console.error('buff has been initialized')
      return
    }
    window.buff = () => {}
  }

```
错误的源头找到了。原因是window.buff 初始化中触发了重复的判断逻辑导致了error。那么重复初始化的原因又是因为啥。A某于是继续排查。会是什么导致这里被重复初始化呢。找着找着A某突然发现了端倪。在P项目中。不止项目中引用了 T 通过还有其他的内部包例如E也同样引入了T。在项目中的node_modules中他们的关系是这样的
IMG
恍然大悟 原来是这种嵌套的关系有两份T都执行了导致了重复的error。但是这种嵌套的结构又是怎么出现的?

## 关于 

首先我们了解一些概念

### node是什么？ 
> Node.js 是一个开源与跨平台的 JavaScript 运行环境.可以理解node和浏览器类似.为JS的运行提供了底层的支持.基于跨平台这一特性.Node.js 成为了 Web 前端开发必不可少的基础设施.也为React/vue/webpack的爆发赋能

### npm是什么？ 
> npm 是 Node.js 标准的软件包管理器.起初是为了管理node.js项目中的依赖.后续逐渐发展为前端工程项目中不可或缺的一部分.他还是世界上最大的软件注册中心.各大洲的开源开发人员都使用 npm 来共享和借用包，许多组织也使用 npm 来管理私有开发.

### node_modules是什么 
> node_modules 本身是一个目录.目录下汇总了工程中所用到的所有的 npm 包或者依赖包.它的生成是由npm控制.它的校准文件是项目中的package.json文件.

**node_modules 可以分为全局和本地两种 **

例如我们执行以下命令：
```js
npm install lodash
```
npm 会为我们把 lodash 安装到本地的 node_modules 文件中.

通过 -g 我们可以把包安装到全局：
```js
npm install lodash -g
```
npm 会为我们把 lodash 安装到全局的位置. 我们可以通过 `npm root -g`命令查看全局包的安装位置


**package.json**

package.json是项目内的依赖校准文件,或者理解为一个清单.在这个文件里.涵盖了当前工程中所有的依赖包.

一些主要选项
1. dependencies  --  dependencies 是生产环境需要的
2. devDependencies  -- devDependencies 是一些在开发环境需要用到的
3. peerDependencies -- 开发插件是 插件所依赖的包
4. 





** peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。**




## package 和 package-lock


## 