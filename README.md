# Loader(基础说明)
postcss-loader：一般用于添加兼容性属性前缀；

url-loader：用于将图片,视频等小于一定大小的文件，转为 base64 字符串；

file-loader：url-loader 不能转换 base64字符串 的文件，被这个处理（主要用于设置打包后图片路径，以及CDN等；

html-withimg-loader：用于加载html模板；

babel-loader：用于将es6、es7等语法，转换为es5语法；

css-loader：用于处理css文件（主要是处理图片的url；

style-loader：将转换后的css文件以 style 标签形式插入 html 中；

less-loader：以 less 语法来写 css；

sass-loader：以 Ruby 语法来写 css；

node-sass：是一个库，它将Node.js绑定到LibSass,并通过连接中间件自动将.scss文件转为.css文件；



#  使用说明
安装：
```
npm install 
```

运行
```
npm run dev 
```

打包示例demo:
```
npm run build-demo
```

打包发布:
```
npm run build-demo
```

#  注:
webpack 从 4.0 版本开始，在安装时，就必须要安装webpack 和 webpack-cli 这2个东西。
webpack 是打包代码时依赖的核心内容，而 webpack-cli 是一个用来在命令行中运行 webpack 的工具。
