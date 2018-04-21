const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (env, options) => {

    const plugins = [
        new HtmlWebpackPlugin({
            title: 'My Webpack Boilerplate',
            template: 'index.html'
          }),
    ];

    if (options.mode === 'production') {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'bundle_analyze.html',
                openAnalyzer: false
            })
        );
    }

    return {
        entry: {
            app: './app/app.ts',
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
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
    }
};