
## 引言
小明接收一个需求。需求是这样：” 升级 T (sdk) 以在 Q (App) 兼容  P项目 (h5)  “。需求很简单，理论上只需要升级 A 就可以。但是在实际的过程中并不轻松。列举一个case


![WeChat8a7c83caf458ab6fbe65825e5fe2fb7d.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ff123e091244736a9100d85b399f934~tplv-k3u1fbpfcp-watermark.image?)
                            

error报错触目惊心,小明于是开始排查.在控制台的报错详情中小明找到了一条至关重要的信息 也就是报错信息的来源于 T/buff.js. 小明发现buff.js实际是集成了一个功能。该功能是通过挂载window全局使用。里面这样的一行代码

```js

  init(){
    if(window.buff){
      console.error('buff has been initialized')
      return
    }
    window.buff = () => {}
  }

```
错误的源头找到了。原因是window.buff 初始化中触发了重复的判断逻辑导致了error。那么重复初始化的原因又是因为啥。小明于是继续排查。会是什么导致这里被重复初始化呢。找着找着小明突然发现了端倪。在P项目中。不止项目中引用了 T 通过还有其他的内部包例如E也同样引入了T。在项目中的node_modules中他们的关系是这样的

![WeChat1912f06dca3bc683d511795d1a16a324.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d677d3b24534472b8a401a2025b6aabb~tplv-k3u1fbpfcp-watermark.image?)
恍然大悟 原来是这种嵌套的关系有两份T的代码都执行了。导致了重复的error。但是这种嵌套的结构又是怎么出现的?

>首先我们了解一些概念

## node是什么 
> [Node.js](http://nodejs.cn/) 是一个开源与跨平台的 JavaScript 运行环境.可以理解node和浏览器类似.为JS的运行提供了底层的支持.基于跨平台这一特性. Node.js 成为了 Web 前端开发必不可少的基础设施.也为React/vue/webpack等的爆发赋能.        


![WeChat7d2b1c55d33879f15c51ce3e469e2612.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45b77260a49b4f9fa0e933f71769df2a~tplv-k3u1fbpfcp-watermark.image?)

## npm是什么
>  [npm](http://nodejs.cn/learn/an-introduction-to-the-npm-package-manager) 是 Node.js 标准的软件包管理器.起初是为了管理node.js项目中的依赖.后续逐渐发展为前端工程项目中不可或缺的一部分.他还是世界上最大的软件注册中心.各大洲的开源开发人员都使用 npm 来共享和借用包，许多组织也使用 npm 来管理私有开发. 

## node_modules是什么 
> node_modules 本身是一个目录.目录下汇总了工程中所用到的所有的 npm 包或者依赖包.它的生成是由npm控制.

![Snipaste_2021-09-13_00-01-45.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b63ad39776bd497180b54c8560b3dc59~tplv-k3u1fbpfcp-watermark.image?)

**node_modules 可以分为全局和本地两种**

例如我们安装lodash：
```js
npm install lodash //npm 会为我们把 lodash 安装到本地的 node_modules 文件中.
```


通过 -g 我们可以把包安装到全局：
```js
npm install lodash -g //npm 会为我们把 lodash 安装到全局的位置.
```
 我们可以通过 `npm root -g`命令查看全局包的安装位置

![Snipaste_2021-09-12_23-46-58.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/655eb0db8f384b6d93f59468e198196a~tplv-k3u1fbpfcp-watermark.image?)


**node_modules 生成的校准文件是项目中的package.json文件.**

## package.json

> package.json是项目内的依赖校准文件,或者理解为一个清单.在这个文件里.涵盖了当前工程中所有的依赖包.

| 选项 | 释义 |
| --- | --- |
|  dependencies   | dependencies 是生产环境需要的
| devDependencies    | devDependencies 是一些在开发环境需要用到的
| peerDependencies  | 开发插件是 插件所依赖的包
| name                          | 工程命名
| version                      | 版本
| main                           |工程入口(默认es5)
| module                      | es6 模块代码入口（提供tree shaking机制）
| author                       | 作者
| scripts                       | 编写可执行脚本命令

### 版本

1. 公共库作为 npm 的成员.始终遵循着 npm 提供的版本迭代约束. 版本号格式：主版本号.次版本号.修订号.
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
我们可以同步以上提供的命令对项目中版本进行更新.例如

```js
// ./mySdk/package.json
"version": "0.0.1",

npm version prerelease //version => 0.0.1-0
npm version prepatch // version => 0.0.2
npm version preminor // version => 0.1.1
npm version premajor // version => 1.0.1
```

我们也可以通过修饰符对版本进行管理.例如

- `^`：比如`^1.2.5`，代表版本范围`1.*.*`最新
- `~`：比如`~1.2.5`，代表版本范围`1.2.*` 最新

## 全局版本优先

  这时会有一个疑问我们日常的package.json 中似乎并没有很多的依赖但是为什么node_modules中会有这么多的文件呢。我们知道npm插件包也会有自己的依赖包。因此他们的依赖关系可能是这样。

![Snipaste_2021-09-14_11-37-29.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4297cea9ad694b539d92b53b5f10eb8f~tplv-k3u1fbpfcp-watermark.image?)

上图中有一个组件C不仅被依赖在P同时也依赖在A中. 这种依赖关系便要求C支持多版本共存。这个场景就是小明遇到的问题. 恰巧T因为涉及到了全局的操作。所以是并不支持或者理解为T版本不希望多版本共存.出现这种多版本共存的原因会是什么。我们来看一个 demo 项目中的 ansi-regex 插件依赖关系图


![Snipaste_2021-09-14_13-10-39.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01ea2897a9814129bc1242634d040040~tplv-k3u1fbpfcp-watermark.image?)

在node_modules中的目录结构是这样的：


![Snipaste_2021-09-13_00-17-20.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6b3e2c3df5e400ca22cbca3116ce36a~tplv-k3u1fbpfcp-watermark.image?)

ansi-align 依赖的高版本ansi-regex被重复依赖在 ansi-align 的node_modules.而has-ansi依赖的低版本则没有被重复依赖.因此我们可以透析到npm的版本策略：

* 插件依赖版本 > 全局版本  （ 插件node_modules会独自依赖 ）

* 插件依赖版本 <=  全局版本 （ 插件版本会依赖全局 ）

**那有什么办法可以避免多版本共存呢？**

1> peerDependencies

package.json中为我们提供了peerDependencies选项. peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，在sdk内部导入所依赖的包，就会是引用宿主环境统一安装的npm包版本。这样可以避免多版本共存

2> 区间依赖（避免写死依赖）

npm 为了增加版本解析的灵活度，基于[node-semver](https://github.com/npm/node-semver/) 引入了一些`operator`。这些`operator`允许我们指定一定范围的依赖库版本. 常见的比如：< 、> 、<= 、>= 、= .默认值便是 = .

```js

"vue": ">0.0.8" // vue 必须满足大于 0.0.8版本
"vue": "1.1.2 - 1.3.1" //vue 必须满足 1.1.2 至 1.3.1 这个区间

```

### 拓扑结构扁平化

![Snipaste_2021-09-13_15-24-09.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2b8b0067a664425ba2d302494ced6f2~tplv-k3u1fbpfcp-watermark.image?)

如图. 当存在这种深层嵌套依赖时，对应的node_modules也会是这样嵌套吗(想想就可怕).

我们还是以 demo 项目中的全局依赖 ansi-align 插件为例

在demo项目中 package-lock.json 中他们的依赖关系是这样的：

![Snipaste_2021-09-13_00-35-06.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d53843437ab4037af29ef05bb4c6ecb~tplv-k3u1fbpfcp-watermark.image?)

本质上的依赖关系 是 ansi-align -> string-width -> strip-ansi -> ansi-regex。但是在package-lock.json中他们结构依赖却是同级 其中的拓扑结构是如图

![Snipaste_2021-09-14_11-43-41.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dad2a6c575e14f9cb5ca517380001aa1~tplv-k3u1fbpfcp-watermark.image?)

因此我们不难得出 npm 的对于深层嵌套的处理方式会将其拍平在当前环境的 node_modules.也就是扁平化处理深层依赖.


## package-lock.json

**该文件旨在跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制（即使软件包的维护者更新了软件包    ----引自http://nodejs.cn/**

我们需要先了解一些概念

- `^`：比如`^1.2.5`，代表版本范围`1.*.*`最新
- `~`：比如`~1.2.5`，代表版本范围`1.2.*` 最新
- `1.2.5`，代表固定版本`1.2.5`
- 
- 默认使用前缀`~`：`npm config set save-prefix '~'`
- 不使用前缀，保存确切版本 ：`npm config set save-exact true`

在执行npm i的时候在没有版本锁定的情况下 npm 会为我们更新可更新插件版本。工程项目中往往并不会只有一个人开发。因此会有这样的场景 A 依赖B 1.2.0 是没有问题。而 C 同学克隆项目后 npm  install 之后B 升级到1.2.1 出现了 bug. 

这就是版本依赖所带来的问题.可以通过 `1.2.0` 这种方式固定版本.但却无法控制 B 插件的依赖也是固定的. package-lock 正是为了解决这一现象. 他对项目中依赖依赖关系进行定格描述.来保证每一个人的依赖关系都是同样的.

## 最后

node_modules 在我们日常开发中.本身其实是作为黑盒的存在.一般情况我们并不需要关心插件包的安装.很多团队会将公共业务以及逻辑以 npm 插件的方式服务业务. 另一种情况当项目越来越庞大时.依赖包也会变得越来越复杂. 项目中的版本管理也会变得尤其重要.

regex -> 瑞扎克斯
peer -> 撇而
align -> 额len
width -> 薇姿
