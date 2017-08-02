const webpack = require('webpack')

//目录路径定义
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)//根目录
const BUILD_PATH = path.resolve(__dirname, 'build_pro')//发布构建目录

//插件
const CleanWebpackPlugin = require('clean-webpack-plugin')//旧构建清理
const DefinePlugin = webpack.DefinePlugin//环境变量设置
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin//混淆压缩

module.exports = {
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash:8].js'
    },
    plugins: [
        new CleanWebpackPlugin(BUILD_PATH, {
            root: ROOT_PATH,
            verbose: true
        }),
        new DefinePlugin({
            WEBPACK_HOST: '"http://gzqichang.com"',
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        })
    ]
}