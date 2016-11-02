var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: [

		"./src/index"
	], 
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "bundle.js" //the only thing that index.html imports
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	module: {
		loaders: [{
			test: /\.css$/, 
			loader: 'style!css'
		}
		]
	},
	devServer: {
		contentBase: [
			'./build'
		],
		hot: true,
		inline: true
	}
}