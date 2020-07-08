const fs = require('fs');

// 这里的都是异步
// 读取文件
// fs.readFile('./view/one.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });
// 写入文件
// fs.writeFile('./view/one.txt', '是个优秀的人', (err, data) => {
//     console.log('我执行完了');
// })
// 追加方式1
// fs.appendFile('./view/one.txt', '任岭鑫', () => {
//     console.log('追加完成');
// });
// // 追加方式2
// fs.writeFile('./view/one.txt', '是个优秀的人', {
//     flag: 'a'
// }, (err, data) => {
//     console.log('追加方式2完成');
// })


// 同步方式与异步方式对比

console.log('同步读取前...');
fs.readFileSync('./view/one.txt');
console.log('工作A');//如果文件很大，工作A就会被阻隔住
console.log('同步读取成功');



console.log('异步读取前...');
fs.readFile('./view/one.txt',()=>{
    console.log('异步读取成功');
});
console.log('工作B');
