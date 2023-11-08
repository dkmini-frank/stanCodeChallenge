/**
* @file Webpack production setting file
* @date 2023-11-08
* @author Frank Su
* @lastModify Frank Su 2023-11-08
*/
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // .stan code challenge don't want faviocn in the build fild
            // favicon: './public/favicon.ico',
        }),
        // .stan code challenge only need style.css file so don't need gzip css
        // new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        // new CompressionPlugin({ test: /\.js(\?.*)?$/i, algorithm: 'gzip' }),
    ],
    output: {
        // .stan code challenge only need app.js file so don't need code splitting
        // filename: 'js/[name].[contenthash].js',
        // chunkFilename: 'js/[name].[contenthash].js',
        filename: 'app.js',
    },
};

module.exports = (env) => {
    return merge(commonConfig, prodConfig);
};
