const webpack = require('webpack')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)//根目录

//插件
const DefinePlugin = webpack.DefinePlugin//环境变量设置
const ExtractTextPlugin = require('extract-text-webpack-plugin')//独立样式文件

module.exports = {
    output: {
        publicPath: '/'
    },
    plugins: [
        new DefinePlugin({
            WEBPACK_HOST: '"http://gzqichang.com"',
            'process.env': {
                NODE_ENV: '"development"'//'"production"'
            }
        }),
        new ExtractTextPlugin({
            disable: true
        }),
    ],
}