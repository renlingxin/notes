##                webpack

### 资料

>
> webpack  webpack-dev-server 版本不兼容 问题 => https://blog.csdn.net/sxs7970/article/details/88746939

### 概念
#### 一  入口 --- entry
入口起点指示webpack应该使用哪个模块，来构建其内部依赖图的开始，进入入口起点后，webpack会找出有哪些模块和库是入口起点（直接和间接）依赖的。
**默认值是 ‘ . /src ’ **
```javascript
module.exports = {
   entry:'./main.js' //需要打包的文件
}
```
#### 一  出口 --- output
output属性告诉webpack在哪里创建它所创建的bundles，以及如何命名这些文件
**默认值是' ./dist '**
```javascript
const path = require('path')
module.exports = {
  entry:'./main.js',
  output:{
    path:path.resolve(__dirname,'dist'), //打包后的存放地址
    filename:'build.js' //打包后的文件名
  }
}
```
在上面的例子中，通过output.filename和output.path属性，来告诉webpack bundle的名称,以及生成的地址
#### 一  处理非js文件 --- loader
loader可以将所有类型的的文件转换为webpack能够处理的有效模块
**1>test属性，用于标识出应该被对应的loader进行转换的某个或某些文件**
**2>use属性，表示进行转换时，应该使用哪个loader**

```javascript
const path = require('path');
const config = {
  output:{
    filename:'build.js'
  },
  modules:{
    rules:[
      {test:/\.txt$/,use:'raw-loader'}
    ]
  }
};
module.exports = config;
//“嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。”
```
**补充** 
```javascript
npm install css-loader style-loader --save-dev
npm install css-loader style-loader -D  //上述命令行的简写
```
**举例1---css**
css-loader --- 遇到后缀名为css的文件，webpack先用这个加载器进行解析
style-loader --- 最后计算完css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
**举例2---图片**
url-loader
```javascript
{
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: [
//如果图片的大小（字节）大于4000 则会在dist文件夹下生成图片，在引用。如果图片大小小于40000则会通过base64的方式对图片进行压缩
         'url-loader?limit= 400000'
        ]
}
```
file-loader
**举例3---less**
less-loader
**举例4---vue**
vue-loader
```javascript
//使用
{
   test: /\.vue$/,
   loader: 'vue-loader'
}
// 使用vue-loader必须引入这个插件 ！（在之前的版本是不需要的）
const VueLoaderPlugin = require('vue-loader/lib/plugin')
 // 插件 -- 执行顺序与元素索引有关
plugins: [
    // 确保引入插件
    new VueLoaderPlugin()
]
//使用render渲染组件 --- 使用虚拟dom来渲染节点提升性能，因为他是基于js计算，通过createElements创建dom节点，createElements是render的核心方法
new Vue({
    el:'#app',
    // 使用render的方式渲染组件
    render:c=>c(App)
    // render:  (createElements, context) => createElements(App)
})
```

#### 一  插件 --- plugins
loader被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口的功能极其强大，可以用来处理各种各样的任务。
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
module.exports = config;
```

**举例1---打包index.html**

html-webpack-plugin   --- 自动将外部的index.html文件打包进dist文件夹中
```javascript
//插件 -- 执行顺序与元素的索引有关
 plugins: [
        new htmlWebpackPlugin({
            template: './index.html' //参照物
        })
]
```
**举例2---热更新--提高开发效率**
  webpack-dev-server
  --open 自动打开浏览器
  --hot  热更新
  --inline 自动刷新
  --port 指定端口
  --process 显示编译进度
```javascript
//使用配置
  "scripts": {
    "dev": "webpack-dev-server --open --hot --inline --config         ./build/webpack.dev.config.js"
}
```
#### 一  模式 
通过选择development或production之中的一个，来设置mode参数，你可以启用相应模式下的webpack内置的优化
```javascript
module.exports = {
  mode:'production'
}
```
#### 一  扩展--1--文件的导出导入
**文件的导出**
```javascript
//声明并且导出
export var num1 = 1;
//声明再导出
var num2 = 2;
export {num2};
//声明并导出函数
export function add(x,y){
	console.log(x,y)
}
```
**文件的导入**
```javascript
//引入个别
import {num1,num2,add} from './xx.js'
//全局引入
import * as obj from './xx.js'
//使用
obj.num1;
```
#### 一  扩展--2--webpack打包的源码 执行顺序
* 1 把所有模块的代码放入到函数中，用一个数组保存起来
* 2 根据require时传入的数组索引，能知道需要哪一段代码
* 3 从数组中，根据索引取出包含我们代码的函数
* 4 执行该函数，传入一个对象 module.exports
* 5 我们的代码，按照约定，正好是用module.exports = 'xxxx' 进行赋值
* 6 调用函数结束后，modules.exports从原来的空对象，就有值了
* 7 最终return module.exports;作为require函数的返回值
#### 一  扩展--3--package.json 中的配置
```javascript
 ...
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1
     // ./webpack.dev.config.js开发环境的webpack配置 运行npm run dev 
    "dev": "webpack --config ./webpack.dev.config.js", 
    //  ./webpack.prod.config.js可以是其他情况的webpack配置 运行npm run prod 
    "prod": "webpack --config ./webpack.prod.config.js"
  }
...
```
#### 一  扩展--4--es6的解析
**babel-core**
作用是将代码分析成est(抽象语法树)，方便各个插件分析语法进行相应的处理。有些新语法在低版本js中是不存在的，如箭头函数，rest参数，函数默认值等，这种语法层面的不兼容只能通过ast，分析语法后再转为低版本的js
**babel-preset-env**
babel官方预设的一些插件集，称之为preset，这样我们只需要使用对应的preset就可以了：es2015  es2016
**babel-plugin-transfrom-runtime**
解析es6中的API，例如promise.set.map
#### 一  扩展--5--package.json 和 package-lock.json
###### package-lock.json

会在更改node_modules目录树或者package.json自动生成

**在有package.json项目中执行npm i 的时候会自动生成一个package-lock.json文件。再次执行npm i 时候，会根据package-lock.json来处理和安装依赖**

**长得和package.json相似，但是更加复杂。是一个包含所有依赖的巨大列表，包含明确的版本号，依赖的获取地址，一个用于验证完整性和正确的哈希值，以及这个依赖所需要的依赖**

**cnpm不支持package-lock.json**

#### 一  扩展--6-- devServer

hot => 启用 webpack 的模块热替换特性
hotOnly => 当编译失败时，不刷新页面 适用脚手架

## GIT
https://www.cnblogs.com/miracle77hp/articles/11163532.html
工作区 -- 暂存区 -- 本地仓库 -- 远程仓库 

##### 常用命令总结
git status      查看文件状态

git add .  添加全部修改文件到 暂存区

git commit -m   提交暂存区的文件到本地的版本库

git push    推送当前分支到远程仓库

git clone   将远程仓库克隆到本地

git diff 分支名  xxx   查看当前分支与某分支不同的xxx文件详情

git diff 分支名 --stat   查看当前分支与某分支不同的文件

git diff master  =>  查看当前分支与master分支的不同 

git branch -a   查看远程分支+本地分支

git branch   查看本地分支

git branch -d     删除分支

git checkout 分支名 

git checkout -b 分支名

git stash    暂时将未提交的变化存储到堆栈中  稍后再移入

git stash save <message> => 添加备注信息的暂存

git stash list   查看移除的内容列表

git stash pop   将移除的内容移入

git log  查看当前分支的版本历史

git log -S [xxx]   搜索提交历史，根据关键词

git log -p [file]   查看指定文件相关的每一次diff

git shortlog -sn  查看所有提交过的用户  按提交次数降序

git reflog   展示已经执行过的所有动作的日志

git reset HEAD@{1}  回退到执行的这一步

git merge 分支名    合并指定分支到当前分支

git init    初始化

git tag   列出所有的标签      tag会记录版本的commit号，方便后期回溯

git tag -l ' v0.3.* ‘ 加 -l 命令过滤 tag

git branch -m old_br new_br  更改分支名

git tag tagName 本地创建 tag

git tag -a tagName -m ' 备注信息 ' 创建tag并添加备注信息

git show tagName 查看tag的详细信息

git push origin tagName 将本地创建的tag同步到远程

git tag -d tagName 删除本地分支

git push origin :refs/tags/tagName 删除远程tag

git reset --soft HEAD^    不删除工作空间改动的代码  撤销commit 不撤销add.(软重置)

git reset --mixed HEAD^  默认参数  不删除工作空间改动代码 并且撤销add.  === git reset HEAD^

git reset --hard HEAD^  删除工作空间改动代码 撤销commit 撤销add.(硬重置)

git revert ec5be  撤销修改：通过对特定的提交执行还原操作，创建一个包含已还原修改的新提交

git cherry-pick ec5be 挑选其他分支上更改（ec5be）到当前分支

git fetch origin master 下载远程分支master上的最新修改

git pull  等价于 git fetch 和 git merge   拉取线上分支最新内容，并且自动合并

git merge 分支名 => 合并： 将一个分支的修改应用到当前分支

git merge --abort => 合并的时候遇见冲突 返回合并前的状态

git rebase  => 变基: 将当前分支的提交复制到指定的分支之上。(融入)

变基与合并有一个重大的区别：Git 不会尝试确定要保留或不保留哪些文件。我们执行 rebase 的分支总是含有我们想要保留的最新近的修改！这样我们不会遇到任何合并冲突，而且可以保留一个漂亮的、线性的 Git 历史记录。

HEAD => 本质上仅仅是个指向 commit 对象的可变指针,每个仓库只有一个HEAD  git checkout 就是在改变HEAD指向

git config -l  => 查看配置信息

git config --global user.name  '' => 修改name

git config --global user.email  '' => 修改邮箱

cd ~/.ssh => 查看本地ssh信息   .pub结尾的文件是公钥

ssh-keygen -t rsa -C "your.email@example.com"  => 生成密钥

**git -- commit 提交规范**
1. feat：新功能 
2. fix：修复bug 
3. doc：文档改变
4. style：代码格式改变
5. refactor：某个已有功能重构
6. perf：性能优化
7. test：增加测试
8. build：改变了build工具 如 grunt换成了 npm
9. revert：撤销上一次的commit

**git密钥规则**

> 文章链接 https://juejin.im/post/5a2941ad6fb9a045030ffc95

密钥登录比密码登录安全，主要是因为他使用了非对称加密，登录过程中需要用到密钥对。整个登录流程如下：
1. 远程服务器持有公钥，当有用户进行登录，服务器就会随机生成一串字符串，然后发送给正在进行登录的用户。
2. 用户收到远程服务器发来的字符串，使用与远程服务器公钥配对的私钥对字符串进行加密，再发送给远程服务器。
3. 服务器使用公钥对用户发来的加密字符串进行解密，得到的解密字符串如果与第一步中发送给客户端的随机字符串一样，那么判断为登录成功。



git reset --hard id

git push origin HEAD --force

 

**git远程操作**

1. git clone 

```javascript
git clone -b <分支名> xxx => 指定clone分支
```
2. git remote  为了便于管理，Git要求每个远程主机都必须指定一个主机名。git remote命令就用于管理主机名。
```javascript
git remote => 展示主机名
git remote -v => 展示远程主机名 网址
git remote show <主机名> => 展示主机的详细信息
git remote add <主机名> <网址> => 添加主机名
git remote rm <主机名> => 删除
git remote rename <原主机名> <新主机名> => 给主机名改个名字
```

3. git pull


```javascript
git pull <远程主机名> <远程分支名>:<本地分支名> => git pull 完整格式 取回远程分支名并且与本地指定分支合并 上面的操作等同于执行 git fetch git merge 

git pull -p => 在本地删除远程已经删除的分支
```

git 会在本地分支与线上分支之间建立一种追踪关系（tracking)；在git clone的时候，所有本地分支默认与远程同名分支建立追踪关系；git 也提供了手动修改追踪关系的方法

```javascript
git branch --set-upstream rlx origin/dev => 将本地分支rlx 与 远程分支dev建立联系
```

4. git push
```javascript
 git push <远程主机名> <本地分支名>:<远程分支名> => git push 完整格式
 git push origin :master => push 空的内容到远程 相当于删除远程分支 
 git push origin master => 推送内容 远程分支没有就新建
```
5. git cherry-pick 将其他分支的commit id ( git log 查看 ) 再次提交


扩展：

不带任何参数的git push，默认只推送当前分支，这叫做simple方式。此外，还有一种matching方式，会推送所有有对应的远程分支的本地分支。Git 2.0版本之前，默认采用matching方法，现在改为默认采用simple方式。如果要修改这个设置，可以采用git config命令。

```javascript
  $ git config --global push.default matching
  $ git config --global push.default simple
```
5. git fetch 取回远程分支的最新更新
```javascript
git fetch <远程主机名> => 拉取更新
git fetch <远程主机名> <分支名> => 取回指定分支内容更新
```

**git稀疏检出(sparse checkout)**

> 稀疏检出就是本地版本库检出时不检出全部，只将指定的文件从本地版本库检出到工作区，而其他未指定的文件则不予检出（即使这些文件存在于工作区，其修改也会被忽略）

```javascript
  // 初始化git 
  git init
  git remote add rlx https://github.com/babel/babel.git
  // 打开 开关 
  git config core.sparsecheckout true
  // 指定目录
  echo "src/rlx" >> .git/info/sparse-checkout
  // 获取代码
  git pull rlx master
```

### package.json

1. dependencies 和 devDependencies 
devDependencies 是一些在开发环境需要用到的
dependencies 是生产环境需要的
2. 

- `^`：比如`^1.2.5`，代表版本范围`1.*.*`最新
- `~`：比如`~1.2.5`，代表版本范围`1.2.*` 最新

- 默认使用前缀`~`：`npm config set save-prefix '~'`
- 不使用前缀，保存确切版本 ：`npm config set save-exact true`



