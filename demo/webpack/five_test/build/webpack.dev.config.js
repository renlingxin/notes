var path = require('path')

var htmlWebpackPlugin = require('html-webpack-plugin')

// 使用vue-loader必须引入这个插件 ！
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve('./dist'), //相对路径转绝对路径
        filename: 'build.js'
    },
    mode: 'development',
    watch: true, //监视文件改动 自动生成build.js
    // loader 指定解析模块 
    module: {
        // 这是webpack1 的引入方式！ 建议放弃！
        // 'css-loader!style-loader'
        rules: [{
                //正则的方式 标识需要解析的文件后缀名
                test: /\.css$/,
                //不包含某个文件
                // exclude:/node_modules/  
                //指定这类文件用哪种方式来解析
                use: [
                    'style-loader', //位置必须在前面 作用：能够在需要载入的html中创建一个<style></style>标签，标签里的内容就是css的内容     
                    'css-loader' // 作用是允许在js中 import一个css文件，会将css文件当成一个模块引入到js文件中     
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                use: [
                    //如果图片的大小（字节）大于4000 则会在dist文件夹下生成图片，在引用。如果图片大小小于40000则会通过base64的方式对图片进行压缩
                    'url-loader?limit= 400000'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    // 插件 -- 执行顺序与元素索引有关
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html' //参照物
        }),
        // 确保引入插件
        new VueLoaderPlugin()
    ]
}