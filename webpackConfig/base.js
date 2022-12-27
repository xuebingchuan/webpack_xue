//大部分构建工具都是基于nodejs平台运行的,且默认采用commonjs模式
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const utils = require('./utils')
module.exports = {
    // 需要把构建出的资源文件上传到CDN服务上，以利于加快页面的打开速度
    // https://www.jianshu.com/p/0d0fd1bf7a2e
    // publicPath:{}
    //context会影响到这些相对路径所指向的真实文件
    context: path.resolve(__dirname, '../'),
    //模式,生产环境会自动压缩js代码
    mode: "production", //或development
    // 入口文件(配置多入口后需要在)
    entry: '@/main.js',
    //打包输出
    output: {
        //输出的文件名,加上了:https://www.cnblogs.com/giggle/p/9583940.html
        // 热替换影响了chunkhash和contenthash的使用，你要确保hotModuleReplacementPlugin(）函数没在生产环境下执行才行
        //                   hash值:每次打包所有文件都会生成新的hash值,包括没有发生变动的文件
        //              chunkhash值:公共文件发生改变则有相关有依赖性的文件也会重新生成hash值,即使文件没有发生变动(production环境下使用)
        //            contenthash值:contenthash是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变,会命中缓存，提高性能；(production环境下使用)
        filename: "[name].[hash:6].js",
        //__dirname,nodejs的变量  该配置代表当前文件的目录绝对路径
        path: path.resolve(__dirname, "../dist")
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
                // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
                // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
                // enforce:'post'
            },


            //特别注意,这里的url-loader需要和file-loader一起使用才能有效,版本记录:"url-loader": "0.5.8","file-loader": "1.1.6",
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                //使用单个loader是这样的写法,解析特殊文件使用多个loader要参看scss-loader的配置
                loader: 'url-loader',
                options: {
                    //小于1kb的转化为base64
                    limit: 1024 * 1,
                    //处理打包后的文件的位置及文件名字
                    name: utils.assetsPath('static/[name].[hash:6].[ext]'),
                    // 默认处理不了html中img图片,需要借助html-loader进行处理,
                    // 并且因为url-loader是使用es6模式去解析,而html-loader是使用commonjs默认是去解析,所以地址会出现这样的情况[object module]
                    // 所以需要关闭url-loader的es6模块化模式
                    esModule:false,
                    //调整打包之后的输出路径,或者可以在name前边加上文件夹名同样也可以调整输出路径
                    // outputPath:'static/'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                //不打包字体库
                // exclude: [path.resolve('src/icons')],
                options: {
                    limit: 1024 * 1,
                    name: 'static/[name].[hash:6].[ext]',
                }
            },
            {
                //为了配合url-load使用,解析html中引入的图片等静态资源
                test: /\.html$/,
                loader: "html-loader",
            },

            //处理样式文件的loader处理器
            {
                //"css-loader": "^3.0.0","node-sass": "^4.12.0","sass-loader": "^7.1.0","style-loader": "^0.23.1",
                test: /\.scss$/,
                // 注意:use 的别名 是 loaders。下面3个加载的执行顺序是 3 2 1
                use: [
                    // 1. style-loader将 JS 字符串生成为 style 节点
                    'style-loader',
                    {
                        // 2.css-loader将 CSS 转化成 CommonJS 模块
                        loader: 'css-loader',
                        // 给css-loader传递参数
                        options: {
                            url: true,
                            import: true
                        }
                    },
                    // 3.将 Sass 编译成 CSS
                    'sass-loader'
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader",'css-loader'],
            },
            {
                test: /\.less$/,
                use: ["style-loader",'css-loader','less-loader'],
            },

            {
                // test指定的是对那些文件生效
                test:/\.(ts|tsx)$/, // 通过正则表达式匹配文件的名字
                loader: 'ts-loader', // 通过ts-loader处理以ts结尾的文件
                exclude: /node_modules/, // 指定要排除的文件
                options: {
                    configFile: path.resolve(__dirname, '../tsconfig.json')
                }
            }
        ],
    },
    plugins: [
        //每一次打包，将上一次打包生成的文件删除
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            //指定模板的位置
            template: "index.html",
            //打包生成的文件名
            filename: "index.html",
            //是否把打包好的资源插入到页面中，是否设置hash值
            // hash: true,
            minify: {
                // removeComments: true, //在内存中html中就没有注释
                // collapseWhitespace: true, //清理html中的空格、换行符
                // minifyCSS: true, //压缩内部样式
                // removeEmptyElements: true, //清楚掉空标签
            }
        }),
    ],
    //本地运行配置
    devServer: {
        //启用noInfo，类似webpack bundle启动或保存的信息将会被隐藏，Errors和warnings仍会被显示。
        noInfo: true,
        open: true, //自动打开浏览器
        compress: true,//是否启用gzip压缩
        contentBase: path.join(__dirname, "build"),//对外提供的访问内容的路径
        port: 9000,//提供访问的端口
        hot:true,//开启热更新热替换
        //使用代理
        proxy:{

        }
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
        extensions: ['.js', '.vue', '.json','.ts'],
        //添加别名访问地址
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    },
};
