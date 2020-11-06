const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const clientPlugins = [];

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
