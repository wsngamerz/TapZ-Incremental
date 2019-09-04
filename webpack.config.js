const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
    mode: "production",
    devtool: 'source-map',
    entry: {
        polyfills: "./src/polyfills.js",
        game: "./src/main.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist", "assets", "js")
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: true
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true
            })
        ],
    },
}
