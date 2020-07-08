const fs = require('fs');

// 同步读取文件    二进制文件
let data = fs.readFileSync('./tim.txt', 'utf8')
console.log(data);
// 写入到tims.txt
fs.writeFileSync('./tim2.txt',data);
console.log('文件写入成功');