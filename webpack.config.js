const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (env, options) => {

    const isProduction = options.mode === 'production';

    const plugins = [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            'MODE': JSON.stringify(options.mode)
        }),
    ];

    if (isProduction) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'bundle_analyze.html',
                openAnalyzer: false
            })
        );
    }

    return {
        devtool: isProduction? '' : 'inline-source-map',
        entry: {
            app: './app/index.ts',
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.join(__dirname, './build'),
            chunkFilename: '[name].[chunkhash].js',
            publicPath: '/',
        },
        optimization: {
            runtimeChunk: false,
            splitChunks: {
                cacheGroups: {
                    commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    }
                }
            }
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.tsx?$/,
                    loader: 'tslint-loader',
                    exclude: /node_modules/,
                },
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
    }
};