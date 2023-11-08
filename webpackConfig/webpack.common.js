/**
* @file Webpack Common File
* @date 2023-11-08
* @author Frank Su
* @lastModify Frank Su 2023-11-08
*/
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.tsx'),
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../src/'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
            },
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|pdf|eot|ttf|svg)$/,
                type: 'asset/resource',
                generator: {
                    // .stan code challenge only need asset origin file name so don't need hash file name
                    // filename: '[hash][ext][query]',
                    filename: '[name][ext][query]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 20kb
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            APP_ENV: JSON.stringify(process.env.CEM),
        }),

        new webpack.ProgressPlugin({ percentBy: 'entries' }),
        new ForkTsCheckerWebpackPlugin({
        issue: {
            exclude: ({ file }) => {
                return file?.includes("node_modules") || false;
            },
        },
        typescript: {
            enabled: true,
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
        },
    }),
    ],
    // .stan code challenge only need app.js file so don't need code splitting
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments:false,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    }
                },
            }),
        ],
        // moduleIds: 'size',
        // usedExports: true,
        // runtimeChunk: 'single',
        // splitChunks: {
        //     chunks: 'all',
        // },
    },
    output: {
        // .stan code challenge need the build folder named as 'dist'
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        pathinfo: false,
        // .stan code challenge only need asset build into root fold and with origin file name
        // assetModuleFilename: 'static/[hash][ext][query]'
        assetModuleFilename: '[name][ext][query]'
    },
};
