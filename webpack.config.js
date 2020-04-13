const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
var SRC = path.resolve(__dirname, 'src/app');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/app/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.json?$/,
                use: 'json-loader'
            },
            {
                test: /\.css?$/,
                use: 'raw-loader'
            },
            // workaround for warning: System.import() is deprecated and will be removed soon. Use import() instead.
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: {system: true}
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i, ///\.(eot|gif|otf|png|svg|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //include: SRC,
                use: ['file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new webpack.DefinePlugin({
            // global app config object
            config: JSON.stringify({
                apiUrl: 'http://localhost:5024'
            })
        }),

        // workaround for warning: Critical dependency: the request of a dependency is an expression
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            path.resolve(__dirname, 'src')
        )
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true
    },
    devServer: {
        historyApiFallback: true
    }
}
