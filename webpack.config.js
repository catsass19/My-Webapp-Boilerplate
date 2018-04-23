const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {

    const isProduction = options.mode === 'production';

    let _basePath = '/';
    const { BASE_URL } = process.env;
    if (isProduction && BASE_URL && (typeof BASE_URL === 'string')) {
        _basePath = BASE_URL;
        console.log(`Base url of this build is: ${_basePath}`);
    }

    const plugins = [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            favicon: './app/favicon.ico'
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
            publicPath: _basePath,
        },
        optimization: {
            runtimeChunk: {
                name: "runtime"
            },
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
                {
                    test: /.*\.(gif|png|jpe?g|svg)$/i,
                    loader: 'file-loader',
                    options: {
                      name: '/[name]_[hash:7].[ext]',
                      outputPath: 'assets/'
                    }
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                '@': path.resolve(__dirname, 'app/')
            }
        },
        devServer: {
            /*
            proxy: {
                "/api": {
                    target: "http://localhost:1234/",
                    secure: false,
                    pathRewrite: {"^/api" : ""}
                }
            }
            */
        }
    }
};