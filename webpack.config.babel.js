import path from 'path'
import webpack from 'webpack'
import FlowWebpackPlugin from 'flow-webpack-plugin'

export default {
    entry: {
        vendor: ['lodash', 'jquery'],
        app: './src/babel/script.js'
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, './dist/assets/js')
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
        }),
        new FlowWebpackPlugin({
            all: false,
            weak: false,
            declarations: './interfaces',
            killFlow: false,
            beep: true,
            abort: false
        })
    ]
}
