const path = require('path')

// 通过node 模块操作，向外暴露一个配置对象
module.exports = {
    entry: path.join(__dirname, './main.js'), //打包文件
    output: {
        path: path.join(__dirname, './dist'), //打包好的文件存放地址
        filename: 'build.js' //打包好文件的文件名
    },
    mode: 'development' //设置mode
}