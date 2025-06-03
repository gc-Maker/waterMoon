# 1项目初始化

## 1.1 yarn init -y 初始化package.json文件
## 1.2 添加 .gitignore 文件
## 1.3 安装 webpack 和 webpack-cli 并配置webpack.config.js

### 1.3.1 html-webpack-plugin： 自动生成html文件，并注入打包后的js丶css文件。

## 1.4 引入loader
    css样式解析：style-loader + css-loader + less-loader + less
    js解析：babel-loader + @babel/core + @babel/preset-env
## 1.5 Eslint配置，配置.eslintrc.js文件. eslint如果配置了ts解析则会依赖tsconfig.json文件， 运行npx tsc --init初始化tsconfig.json文件

### 要想在开发环境中保存时就直接能在控制台打印eslint报错，需要依赖webpack插件eslint-webpack-plugin
### husky + lint-staged这个说是用来做提交检查的需要验证一下。

