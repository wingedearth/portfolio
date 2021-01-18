const path = require('path');
const getRules = require('./webpack/rules');
const getOptimization = require('./webpack/optimization');
const getPlugins = require('./webpack/plugins');
const getBaseConfig = require('./webpack.base.config');
const baseConfig = getBaseConfig(process.env.NODE_ENV);

const isServer = true;

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
		rules: getRules(isServer)
	},
	optimization: getOptimization(isServer),
	plugins: getPlugins(isServer),
	target: 'node',
	watchOptions: {
		ignored: /node_modules/
	},
	...baseConfig
};
