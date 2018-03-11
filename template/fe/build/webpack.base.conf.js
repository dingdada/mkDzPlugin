/**
 * @file webpack base config file
 * @author dinglingjuan
 */


var path = require('path');
var config = require('../config');
var utils = require('./utils');
var version = require('../package.json').version;
var webpack = require('webpack');


// get absolute path
function resolve(dir) {
    return path.join(__dirname, '..', dir);
};

var srcPath = [resolve('src'), resolve('static')];

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/index.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'common': resolve('src/common')
        }
    },
    module: {
        rules: [ //加载器，关于各个加载器的参数配置，可自行搜索之。
            {
                test: /\.js$/,
                include: srcPath,
                use: {
                  loader: 'babel-loader'
                }
              }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                include: srcPath,
                options: {
                  limit: 10000,
                  name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                include: srcPath,
                options: {
                  limit: 100000,
                  name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(version)
        })
    ]
};
