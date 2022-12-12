//大部分构建工具都是基于nodejs平台运行的,且默认采用commonjs模式
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    //模式,生产环境会自动压缩js代码
    mode: "development", //或production
    // 入口文件
    entry: "@/main.js",
    //打包输出
    output: {
        //输出的文件名,加上了hash值
        filename: "[name].[hash].js",
        //__dirname  nodejs的变量,代表当前文件的目录绝对路径
        path: path.resolve(__dirname, "dist"),
    },
    //loader的配置
    module: {
        rules: [
            //详细说明:https://webpack.docschina.org/loaders/babel-loader/
            //配置Babel-loader，来将es6转换为es5以及将jsx转换为js文件
            {
                //处理js文件
                test: /\.js$/,
                //排除掉node_modules文件
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: [
                        // plugin-transform-runtime   详情参考:https://zhuanlan.zhihu.com/p/394783727
                        // 1.自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代；
                        // 2.当代码里使用了core-js的API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的core-js/stable;
                        // 3.当代码里使用了Generator(es6以上新语法)/async函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的regenerator-runtime/runtime；
                        "@babel/plugin-transform-runtime"
                    ],
                },
            },
        ],
    },
    //plugins的配置
    plugins: [
        //每一次打包，将上一次打包生成的文件删除
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            //指定模板的位置
            template: "index.html"
            /*//打包生成的文件名
            filename: "index.html",
            //是否把打包好的资源插入到页面中，是否设置hash值
            hash: true,
            minify: {
                removeComments: true, //在内存中html中就没有注释
                collapseWhitespace: true, //清理html中的空格、换行符
                minifyCSS: true, //压缩内部样式
                removeEmptyElements: true, //清楚掉空标签
            }*/
        }),
    ],
    //本地运行配置
    devServer: {
        //启用noInfo，类似webpack bundle启动或保存的信息将会被隐藏，Errors和warnings仍会被显示。
        // noInfo: true,
        //自动打开浏览器
        open: true,
        compress: true,//是否启用gzip压缩
        contentBase: path.join(__dirname, "build"),//对外提供的访问内容的路径
        port: 9000//提供访问的端口
    },
    // 引入外部库, 无需webpack打包处理
    externals: {
        /* 'vue':'Vue',
         'vuex':'Vuex',
         'element-ui':'Element-UI',
         'vue-router':'VueRouter',*/
    },
    resolve: {
        //简化引入文件后缀
        extensions: ['.js', '.vue', '.json'],
        //添加别名访问地址
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    },
};
