import path from 'path'
import webpack from 'webpack'
import FlowWebpackPlugin from 'flow-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
    entry: {
        app: [
            './src/babel/script.js',
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client?http://localhost:3000/',
        ],
        vendor: ['lodash'],
    },
    output: {
        path: __dirname,
        publicPath: path.resolve(__dirname, './dist/assets/js/'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: ['babel-loader']
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
            })
        }]
    },
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
        }),
        new ExtractTextPlugin(path.resolve(__dirname, './dist/assets/css/vendor.css')),
        new FlowWebpackPlugin(),
    ]
}
