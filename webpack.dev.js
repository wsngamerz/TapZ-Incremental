const path = require("path")

module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: {
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
    }
}