/**
* @file Webpack Development setting file
* @date 2023-11-08
* @author Frank Su
* @lastModify Frank Su 2023-11-08
*/
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[local]',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    devtool: 'eval-source-map',

    devServer: {
        static: './dist',
        historyApiFallback: true,
        open: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/indexDev.html',
            favicon: './public/favicon.ico',
        }),
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
};

module.exports = (env) => {
    return merge(commonConfig, devConfig);
};
