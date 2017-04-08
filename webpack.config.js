const webpack = require('webpack')
//目录路径定义
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)//根目录
const NODE_PATH = path.resolve(ROOT_PATH, 'node_modules')//node目录
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')//发布构建目录

//构建方式
const isProd = process.env.NODE_ENV === 'production'

//插件
const HtmlWebpackPlugin = require('html-webpack-plugin')//HTML模板快速构建
const CleanWebpackPlugin = require('clean-webpack-plugin')//旧构建清理
const ExtractTextPlugin = require('extract-text-webpack-plugin')//独立样式文件
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin//混淆压缩
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin//提取公共代码


//插件配置
let plugins = [
    new HtmlWebpackPlugin({
        title: 'this is index.html',
        template: 'index.tpl',
        filename: 'index.html',
        chunks: ['index']
    }),
    new CleanWebpackPlugin(BUILD_PATH, {
        root: ROOT_PATH,
        verbose: true
    }),
    new ExtractTextPlugin('[name].[chunkhash:8].css', {
        allChunks: true
    }),
    // new CommonsChunkPlugin({
    //     name: 'common'
    // }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: `"${process.env.NODE_ENV}"`
        }
    }),
]

//发布编译时压缩
if (isProd) {
    //压缩
    plugins.push(
        new UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = {
    entry: {
        index: ['babel-polyfill', ROOT_PATH + '/src/index']
    },
    output: {
        path: BUILD_PATH,
        filename: isProd ? '[name].[chunkhash:8].js' : '[name].[hash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: NODE_PATH,
                query: {
                    plugins: [
                        ['import', [{libraryName: 'antd', style: true}]],
                    ],
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?module&localIdentName=[local]-[hash:6]')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?module&localIdentName=[local]-[hash:6]!sass')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.(png|jpg)/,
                loader: 'url?limit=20000'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }]
    },
    plugins: plugins
}