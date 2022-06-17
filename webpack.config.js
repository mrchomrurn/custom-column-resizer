const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/CustomColumnResizer.js',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [{loader: 'babel-loader'}]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css']
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'custom-column-resizer.js',
        libraryTarget: 'umd',
        library: 'CustomColumnResizer',
        globalObject: 'this'
    },
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    keep_fnames: true,
                    ecma: 6,
                    format: {
                        comments: false,
                    }
                }
            })
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
