var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    context: __dirname,
    entry: './client/index',
     //entry: [
     //  'webpack-dev-server/client?http://localhost:3000',
     //  './client/index',
     //],

    output: {
      path: path.resolve('./static/'),
      filename: "bundle.js",
      publicPath: 'http://localhost:3000/assets/bundles/',
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        //new webpack.optimize.UglifyJsPlugin(),
        //new webpack.optimize.DedupePlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // })
    ],

    module: {
        loaders: [
            {test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
        ]
    },


    resolve: {
        modules: [__dirname, 'node_modules'],
        extensions: ['.js', '.jsx']
    }

}
