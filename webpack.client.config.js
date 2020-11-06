const path = require('path');
const getRules = require('./webpack/rules');
const getOptimization = require('./webpack/optimization');
const getPlugins = require('./webpack/plugins');
const baseConfig = require('./webpack.base.config');

module.exports = {
	entry: {
		client: path.join(__dirname, 'src/client/app.js')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist', 'client')
	},
	module: {
		rules: getRules()
	},
	optimization: getOptimization(),
	plugins: getPlugins(),
	target: 'web',
	...baseConfig
};
