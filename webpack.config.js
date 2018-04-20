const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, './app/app.ts'),
    output: {
        filename: 'app.js',
        path: path.join(__dirname, './build'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'My Webpack Boilerplate',
        template: 'index.html'
      })
    ],
    module: {
        rules: [
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
};