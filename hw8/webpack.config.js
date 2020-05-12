const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "dist.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }), 
        new CopyPlugin([
            { from: 'public', to: path.join(__dirname, 'dist') },
          ], [])
    ],
    devServer: {
        compress: true,
        port: 8080
    }
};