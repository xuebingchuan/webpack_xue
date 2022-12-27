/**
 * way:开发环境与测试环境
 * */
let baseConfig = require('./base')
const path = require("path");
let webpack = require('webpack')
const merge = require('webpack-merge')
let webpackConfig = merge(baseConfig,{
    mode: "development",
    // 入口文件(配置多入口后需要在new多个HtmlWebpackPlugin生成多页面,否则后边的文件会合并到第一个文件里边)  https://blog.csdn.net/Celine921/article/details/124135747
    entry: ['@/main.js'],
    //打包输出
    output: {
        filename: "[name].[hash:6].js",
        path: path.resolve(__dirname, "../dist")
    },
})


//执行回调
webpack(webpackConfig,()=>{
    console.log('打包完成')
    // console.log('- Local:   http://localhost:8889/wa-manage-view/')
    // console.log('- Network: http://192.168.40.231:8889/wa-manage-view/')
})
module.exports = webpackConfig