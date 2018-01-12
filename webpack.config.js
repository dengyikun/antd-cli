const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const localConfig = require('./webpack.local')
const devConfig = require('./webpack.dev')
const proConfig = require('./webpack.pro')
//目录路径定义
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)//根目录
const NODE_PATH = path.resolve(__dirname, 'node_modules')//node目录

//插件
const HtmlWebpackPlugin = require('html-webpack-plugin')//HTML模板快速构建
const ExtractTextPlugin = require('extract-text-webpack-plugin')//独立样式文件
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin//提取公共文件
const ProvidePlugin = webpack.ProvidePlugin//全局变量

//块排序
var chunksSortMode = function(chunks) {
    return function(chunk1, chunk2) {
        var index1 = chunks.indexOf(chunk1.names[0])
        var index2 = chunks.indexOf(chunk2.names[0])
        if (index2 == -1 || index1 < index2) {
            return -1
        }
        if (index1 == -1 || index1 > index2) {
            return 1
        }
        return 0
    }
}

const commonConfig = {
    entry: {
        main: ['babel-polyfill', ROOT_PATH + '/src/main']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: NODE_PATH,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?module&localIdentName=[local]-[hash:6]!postcss-loader!sass-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.(png|jpg|svg)/,
                use: 'url-loader?limit=20000&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'this is index.html',
            keywords: '',
            favicon: './src/assets/images/favicon.svg',
            template: 'index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new ExtractTextPlugin({
            filename: '[name].[chunkhash:8].css',
            allChunks: true
        }),
    ],
}

module.exports = process.env.NODE_ENV === 'local' ?
    webpackMerge(
        commonConfig,
        localConfig
    ) :
    [
        webpackMerge(
            commonConfig,
            devConfig
        ),
        webpackMerge(
            commonConfig,
            proConfig
        )
    ]