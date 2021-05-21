const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: '/client/index.js',
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    devServer: {
        // https://webpack.js.org/configuration/dev-server/#devserverpublicpath-
        publicPath: '/build/',
        compress: true,
        port: 8080,
        proxy: {
          '/api': 'http://localhost:3000',
        },
    },
    
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
}