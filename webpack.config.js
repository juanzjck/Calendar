const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports={
    entry:path.resolve('src/index.js'),
    output: {
        filename: 'app.bundle.js',
        publicPath:'/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
            'node_modules'
        ]     
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'public/index.html'
          }),
          
    ],
    module:{
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                plugins:['@babel/plugin-syntax-dynamic-import'],
                presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                loader: 'url-loader',
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    stats: {
        children: false,
    }
}