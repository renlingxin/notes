module.exports = {
    entry: './main.js',
    output: {
        filename: 'build.js'
    },
    mode: 'development',
    watch:true //监视文件改动 自动生成build.js
}