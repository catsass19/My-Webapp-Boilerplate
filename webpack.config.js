const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const MANIFEST = require('./app/manifest.json');

const OUTPUT_FOLDER = './build';
const APP_ICON = './app/favicon.png';

module.exports = (env, options) => {

    const isProduction = options.mode === 'production';

    let _basePath = '/';
    const { BASE_URL } = process.env;
    if (isProduction && BASE_URL && (typeof BASE_URL === 'string')) {
        _basePath = BASE_URL;
        if (_basePath.substr(-1) != '/') _basePath += '/';
        console.log(`Base url of this build is: ${_basePath}`);
    }

    const plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            title: MANIFEST.name,
            description: MANIFEST.description,
        }),
        new webpack.DefinePlugin({
            'MODE': JSON.stringify(options.mode)
        }),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tslint: true
        }),
        (isProduction ?
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'bundle_analyze.html',
                openAnalyzer: false
            })
            :
            new CleanTerminalPlugin()
        ),
        new DuplicatePackageCheckerPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ];

    return {
        devtool: isProduction? '' : 'inline-source-map',
        entry: {
            vendor: ['react', 'react-dom', 'react-loadable'],
            client: './app/index.ts',
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.join(__dirname, OUTPUT_FOLDER),
            chunkFilename: '[name].[chunkhash].js',
            publicPath: _basePath,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                   vendor: {
                       chunks: 'initial',
                       name: 'vendor',
                       test: 'vendor',
                       enforce: true,
                   }
                }
            },
            runtimeChunk: true,
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'cache-loader' },
                        {
                            loader: 'thread-loader',
                            options: {
                                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                workers: require('os').cpus().length - 1,
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack,
                                logLevel: 'warn'
                            }
                        }
                    ]
                },
                {
                    test: /.*\.(gif|png|jpe?g|svg)$/i,
                    loader: 'file-loader',
                    exclude: /node_modules/,
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
            stats: {
                all: false,
                // chunks: true,
                assets: true,
                errors: true,
                // timings: true,
                performance: true,
                warnings: true,
            },
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