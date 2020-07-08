1、异步读取
　　fs.readFile( url , code , callback);

2、同步读取
　　fs.readFileSync( url , code );
```　　

 1 var fs = require('fs');
 2 // 异步读取
 3 fs.readFile('input.txt', function (err, data) {
 4     if (err)    return console.log(err);
 5     console.log('异步读取：' + data.toString());
 6 })
 7 // 同步读取
 8 var data = fs.readFileSync('input.txt');
 9 console.log('同步读取：' + data.toString());
10 console.log('程序执行完毕。');

 ```
3、改变文件名
　　fs.rename(old文件名，新文件名，callback(传递一个err参数))
 
4、同步改变文件名
　　fs.renameSync(oldPath, newPath) 
```
1 fs.rename('hello.txt','index.txt',function(){
2      console.log("修改成功");
3 });
```

5、获取文件信息
　　fs.start(path, callback) 参数使用说明如下：
　　　　path - 文件路径。 callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象
```

 1 　　　　
 2 fs.stat('index.txt',function(err,stats){
 3 　　if(err){
 4 　　　　return err;
 5 　　}
 6 　　console.log(stats);
 7 　　console.log("读取文件信息成功");
 8 　　//检测文件类型
 9 　　console.log('是否为文件(isFile) ? ' + stats.isFile());
10 　　console.log('是否为目录(isDirectory) ? ' + stats.isDirectory());
11 });

```
6、打开文件

　　fs.open(path, flags[, mode], callback)
　　参数使用说明如下：
　　　　path - 文件的路径。
　　　　flags - 文件打开的行为。
　　　　mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
　　　　callback - 回调函数，带有两个参数如：callback(err, fd)。
 ```
1 fs.open('index.txt','r+',function(err,fd){
2     if(err) return err;
3     console.log(fd);
4     console.log('文件打开成功');
5 
6 });
 ```

7、写入文件

　　fs.writeFile(filename, data[, options], callback)

　　如果文件存在，写入的内容会覆盖旧文件内容
　　　　参数使用说明如下：
　　　　　　path - 文件路径。
　　　　　　data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
　　　　　　options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ，flag 为 'w'
　　　　　　callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
```

 1 var fs = require('fs');
 2 console.log('准备写入文件');
 3 fs.writeFile('input.txt', '我是新写入的内容', function (err) {
 4     if (err) console.error(err);
 5     console.log('数据写入的数据');
 6     console.log('-------------------');
 7 });
 8 console.log('读取写入的数据');
 9 fs.readFile('input.txt', function (err, data) {
10     if (err) console.error(err);
11     console.log('异步读取文件数据：' + data.toString());
12 })

 ```

8、读入文件

　　

　　fs.writeFile(filename, data[, options], callback)

　　　　如果文件存在，写入的内容会覆盖旧文件内容
　　　　　　参数使用说明如下：
　　　　　　　　path - 文件路径。
　　　　　　　　data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
　　　　　　　　options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ，flag 为 'w'
　　　　　　　　callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
```

 1 var fs = require('fs');
 2 var buf = new Buffer(1024);
 3 fs.open('input.txt', 'r+', function (err, fd) {
 4     if (err) return console.error(err);
 5     console.log('文件打开成功');
 6     console.log('准备读取文件');
 7     // fd fs.open的标识
 8     // buf 缓存区
 9     // 0, buf.length 缓存区区间
10     // 0, 读取input.txt开始位置
11     fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
12         if (err) console.log(err);
13         console.log(bytes + ' 字节被读取');
14 
15         if (bytes > 0) {
16             console.log(buf.slice(0, bytes).toString());
17         }
18     })
19 })

 ```

9、关闭文件

　　fs.close(fd, callback)

　　　　参数使用说明如下：

　　　　　　fd - 通过 fs.open() 方法返回的文件描述符。

　　　　　　callback - 回调函数，没有参数。
```

 1 var fs = require('fs');
 2 var buf = new Buffer(1024);
 3 fs.open('input.txt', 'r+', function (err, fd) {
 4     if (err) return console.error(err);
 5     console.log('文件打开成功');
 6     console.log('准备读取文件');
 7     // fd fs.open的标识
 8     // buf 缓存区
 9     // 0, buf.length 缓存区区间
10     // 0, 读取input.txt开始位置
11     fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
12         if (err) console.log(err);
13         console.log(bytes + ' 字节被读取');
14 
15         if (bytes > 0) {
16             console.log(buf.slice(0, bytes).toString());
17         }
18     })
19     // 关闭文件 
20     fs.close(fd, function (err){
21         if (err) console.error(err);
22         console.log('文件关闭成功');
23     });
24 })

 ```

10、截取文件

　　fs.ftruncate(fd, len, callback)

　　　　该方法使用了文件描述符来读取文件 参数

　　　　　　 fd - 通过 fs.open() 方法返回的文件描述符。

　　　　　　 len - 文件内容截取的长度。 callback - 回调函数，没有参数
```

 1 var fs = require('fs');
 2 var buf = new Buffer(1024);
 3 console.log('准备打开文件');
 4 fs.open('input.txt', 'r+', function (err, fd) {
 5     if (err) return console.error(err);
 6     console.log('文件打开成功');
 7     console.log('截取10字节后的文件内容');
 8     // 截取文件
 9     fs.ftruncate(fd, 10, function (err) {
10         if (err) console.log(err);
11         console.log('文件截取成功');
12         console.log('读取相同的文件');
13         fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
14             if (err) console.error(err);
15             // 仅仅输出读取的字节
16             if (bytes > 0) {
17                 console.log(buf.slice(0, bytes).toString());
18             }
19             // 关闭文件
20             fs.close(fd, function (err) {
21                 if (err) console.error(err);
22                 console.log('文件关闭成功');
23             })
24         })
25     })
26 })

 ```

11、删除文件

　　fs.unlink(path, callback)

　　　　参数

　　　　　　path - 文件路径

　　　　　　callback - 回调函数，无参
```
1 var fs = require('fs');
2 console.log('准备删除文件');
3 fs.unlink('input.txt', function (err) {
4     if (err) return console.log(err);
5     console.log('文件删除成功');
6 })
 ```

12、创建目录

　　fs.mkdir(path[, mode], callback)

　　　　参数

　　　　　　 path - 文件路径

　　　　　　mode - 设置目录权限，默认为0777 callback - 回调函数
```
1 var fs = require('fs');
2 console.log('创建目录 test');
3 fs.mkdir('test', function (err) {
4     if (err) return console.error(err);
5     console.log('目录创建成功');
6 });
 ```

13、查看目录

　　fs.readdir(path, callback)

　　　　参数使用说明如下：

　　　　　　 path - 文件路径。

　　　　　　 callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表
```

1 var fs = require('fs');
2 console.log('查看 /file 目录');
3 fs.readdir('../file/', function (err, files) {
4     if (err) return console.log(err);
5     files.forEach(function (file) {
6         console.log(file);
7     })
8 })

 ```

14、删除目录

 　　fs.rmdir(path, callback)
　　　　 参数使用说明如下：
　　　　　　 path - 文件路径。
　　　　　　callback - 回调函数，没有参数。
```

 1 var fs = require('fs');
 2 console.log('删除 /test 目录');
 3 fs.rmdir('test', function (err){
 4     if (err) console.error(err);
 5     console.log('读取 /test 目录');
 6     fs.readdir('test', function (err, files) {
 7         if (err) return console.log(err);
 8         files.forEach(function (file) {
 9             console.log(file);
10         })
11     })
12 });

 ```

 15、判断文件路径是否存在
　　fs.exists(path, callback)
　　　　接收参数：
　　　　　　path 欲检测的文件路径

　　　　　　callback 回调
```
1 fs.exists('/chengyi',function(exists){
2     if(exists){
3         console.log('路径存在');
4     }
5 });
 ```

16、向文件中追加写入

　　fs.appendFile(name,str,encode,callback);

　　　　参数

　　　　　　name : 文件名

　　　　　　str ： 添加的字段

　　　　　　encode ： 设置编码

　　　　　　callback ： 回调函数

　　
```

1     fs.appendFile('index.txt','窗前明月光，疑是地上霜','utf8',function(err){
2         if(err) console.log(err);
3         fs.readFile('index.txt','utf8',function(err,data){
4             if(err) console.log(err);
5             console.log(data);
6         });
7     });
```