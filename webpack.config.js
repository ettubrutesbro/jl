var path = require('path')
module.exports = {
	entry: "./src/index.js", //file that specifies what the dependencies are
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "bundle.js" //the only thing that index.html imports
	},
	module: {
		loaders: [{
			test: /\.css$/, 
			loaders: ['style','css']
		}
		]
	},
	devServer: {inline: true}
}