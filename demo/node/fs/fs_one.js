// fs 
// 操作文件对象  文件操作就是 IO
//  I ：input 输入
//  o : output输出   展现数据
const fs = require('fs');

//读取文件    二进制文件
// fs.readFile('./tim.txt', 'utf8', (err, data) => {
//     if (err) throw 'cuole'; //抛到控制台显示异常信息
//     
//     // 需要获取字符串数据，就可以调用buffer篮子.toString(编码)函数
//     // console.log(data.toString('utf-8'));
//     console.log(data)
// });

// 写入文件

// fs.writeFile('./tim.txt', '我今天赚了一块钱', (err) => {
//     // window中目录层级超级深的时候，写入会报错
//     if (err) throw err;
//     console.log('写完文件了');
// });

// 追加内容1 appendFile('path',data,callback);

// fs.appendFile('./tim.txt','我今天赚了二块钱', (err) => {
//     // window中目录层级超级深的时候，写入会报错
//     if (err) throw err;
//     console.log('追加文件完成');
// });
// 追加内容2 

fs.writeFile('./tim.txt', '我今天赚了一块钱',{flag:'a'}, (err) => {
    // window中目录层级超级深的时候，写入会报错
    if (err) throw err;
    console.log('写完文件了');
});