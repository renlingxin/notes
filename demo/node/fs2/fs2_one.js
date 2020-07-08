// 接收命令行参数，根据该目录，读取目录下的所有文件夹并输出（遍历文件夹）
const path = require('path');
const fs = require('fs');
// 1: 接收命令行参数    2：=修正该路径 resolve 返回绝对路径  argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数
let inputPath = path.resolve(process.argv[2]);
// 3:判断该路径是否存在 fs.accesss(fs.constants.F_OK)

function testReadFiles(dir) {

    try {
        // accessSync 判断文件和目录是否存在 同步地测试用户对 path 指定的文件或目录的权限。 mode 参数是一个可选的整数，指定要执行的可访问性检查
        fs.accessSync(dir, fs.constants.F_OK);
        // 4:遍历文件夹
        //  4.1：function(dir) {//判断该路径是文件还是文件夹，}

        let state = fs.statSync(dir);//读取文件状态
        console.log(state);
        if (state.isFile()) {
            // 是一个文件
            console.log('是一个文件');
            console.log(dir);
        } else if (state.isDirectory()) {
            console.log('是一个文件夹')
            // 如果是文件输出，如果是文件夹，读取子文件夹  readdirSync 异步地读取文件的全部内容。
            let files = fs.readdirSync(dir);
            // files:['ab.txt','b']
            files.forEach(file => {
                // 调用自己的这个函数，如果是文件，函数内直接输出，如果是文件夹继续调用自己
                testReadFiles(path.join(dir, file));
            });
        }

    } catch (e) {
        console.log('你要找的文件或者文件夹不存在');
    }
}
testReadFiles(inputPath);