/**
 * Created by projo on 2017-10-21.
 */
const path = require('path');

module.exports = {
    entry: './src/doc/js/index.js',

    output: {
        path: path.join(__dirname, 'dist/doc/js/'),
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 7777,
        contentBase: path.join(__dirname, 'dist/')
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }

};