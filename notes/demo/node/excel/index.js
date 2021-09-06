// excel 的操作
// 查看数据
var xlsx = require('node-xlsx').default;
const fs = require('fs');
// // Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`./1.xlsx`));
// // Parse a file
// const workSheetsFromFile = xlsx.parse(`./1.xlsx`);
// // console.log(workSheetsFromBuffer);
// // console.log(workSheetsFromFile);
// console.log(workSheetsFromBuffer[0].data);

// 生成xlsx文件
// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['任岭鑫', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
// var buffer = xlsx.build([{name: "我的数据表", data: data}]);
// fs.writeFile('./2.xlsx',buffer,function(){});

// 合并单元格
const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; // A1:A4
const options = {'!merges': [ range ]};
 
var buffer = xlsx.build([{name: "mySheetName", data: data}], options)
fs.writeFile('./3.xlsx',buffer,function(){});