var webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "global.GENTLY": false
        })
    ],
    node: {
        __dirname: true,
    },/*
    alias: {
        'inherits':'inherits/inherits_browser.js',
        'sugeragent':'superagent/lib/client',
        'emitter':'component-emitter'
    }*/
}