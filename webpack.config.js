const path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: {
        app: "./app/app.ts",
        vendor: [
            'angular/angular.js'
        ]
    },

    devtool: 'inline-source-map',

    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: path.resolve(__dirname, "./build"),
        sourceMapFilename: '[name].js.map'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.html$/,
                exclude: /(node_modules)/,
                use: [
                    {loader: 'file-loader'},
                    {loader: 'extract-loader'},
                    {loader: 'html-loader'}
                ]
            }
        ]
    },

    plugins: [      
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: 'vendor.js'
        })
    ]
};