const path = require('path');
const getRules = require('./webpack/rules');

module.exports = {
	entry: {
		server: path.join(__dirname, 'src', 'server', 'server.js')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist', 'server')
	},
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src')
		},
		extensions: ['.js', '.json', '.jsx'],
		modules: ['node_modules']
	},
	module: {
		rules: getRules()
	},
	target: 'node',
	watchOptions: {
		ignored: /node_modules/
	}
};
