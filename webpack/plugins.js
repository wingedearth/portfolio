const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientPlugins = [
	new MiniCssExtractPlugin({
		filename: 'css/[name].css',
		chunkFilename: 'css/[id].css',
		ignoreOrder: true
	}),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	})
];

const serverPlugins = [
	new CleanWebpackPlugin({
		verbose: true
	})
];

/**
 * @function getPlugins
 * @param {Boolean} [isServer]
 * @returns {Function}
 */
module.exports = (isServer) => {
	const basePlugins = [
		new WebpackAssetsManifest({
			entrypoints: true,
			publicPath: true,
			writeToDisk: true
		})
	];

	return isServer ? [...basePlugins, ...serverPlugins] : [...basePlugins, ...clientPlugins];
};
