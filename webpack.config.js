var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + 'public',
        filename: 'bundle.js',
        // publicPath: '/public/'
    },

    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }

            },
            {
                test: /\.css$/,
                loader: 'style-loader',
                include: [
                    path.resolve(__dirname, "not_exist_path")
                ]
            },
            {
                test: /\/.css$/,
                loader: 'css-loader',
                include: [
                    path.resolve(__dirname, "not_exist_path")
                ],
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }

        ],
        rules: [
            {
                test: /\.(jpeg|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ]
    }
}
