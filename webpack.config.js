// https://github.com/christianalfoni/webpack-express-boilerplate see this if you want to actually deploy...

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});
var webpack = require('webpack')

module.exports = {
	entry: [
	    'webpack-hot-middleware/client?reload=true',
	    './app/index.js'
  	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	output: {
		filename: 'transformed.js',
		publicPath: 'http://localhost:8080/build/',
		path: __dirname + '/build'
	},
	plugins: [
		HTMLWebpackPluginConfig,
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin()
	]
};