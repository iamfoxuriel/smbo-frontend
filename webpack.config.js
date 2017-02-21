var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');


var config = {
    entry: {
        index: [
            'webpack/hot/dev-server',
            APP_PATH
        ],
        vendors: ["react"]
    },
    resolve: {
        alias: {}
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },

    module: {
        noParse: [],
        loaders: [{
            test: /\.js|jsx$/,
            use: [{
                loader: 'react-hot-loader'
            }, {
                loader: 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0'
            }],
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }]
    },

    plugins: [
        new HtmlwebpackPlugin({
            title: 'Small Business Back Office'
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};


/**
 * define alias for vendors
 *
 */
var deps = {
    "react": "react/dist/react.min.js",
    "react-dom": "react-dom/dist/react-dom.min.js",
};
var allDeps = [];
var NODE_MODULE_DIR = path.join(__dirname, 'node_modules');
for (var name in deps) {
    console.log(name);
    var depPath = path.resolve(NODE_MODULE_DIR, deps[name]);
    config.resolve.alias[name] = depPath;
    allDeps.push(name);
}

// config.module.noParse= "/" + allDeps.join("|") + "/";
config.module.noParse = /react|react-dom/;


module.exports = config;