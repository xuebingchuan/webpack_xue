let baseConfig = require('./webpackConfig/production')
const merge = require('webpack-merge')
let webpack = require('webpack')
let webpackConfig = merge(baseConfig,{
        //需要添加新的配置和替换配置
    })
//执行回调
webpack(webpackConfig,()=>{
    console.log('App running at:')
    // console.log('- Local:   http://localhost:8889/wa-manage-view/')
    // console.log('- Network: http://192.168.40.231:8889/wa-manage-view/')
        })
module.exports = webpackConfig