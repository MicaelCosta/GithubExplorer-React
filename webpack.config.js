const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefresehWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',//Sourcemap, permite visualizar exatamente o código e não o bundle gerado quando ocorrer erro
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),//Autoreload
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactRefresehWebpackPlugin(),//Fast refresh sem resetar estado
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')//Criação tag script com o caminho do bundle gerado
        })
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,//Permite JSX e TSX
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    }
};