const path = require('path');
const babelConfigFile = path.join(__dirname, '..', 'babel.config.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const jsRule = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	use: [
		{
			loader: 'babel-loader',
			options: { configFile: babelConfigFile }
		}
	]
};

const styleRule = isServer => {
	const rule = {
		test: /\.(sa|sc|c)ss$/,
		exclude: /node_modules/,
		use: [
			'css-loader',
			{
				loader: "sass-loader",
				options: {
					// Prefer `dart-sass`
					implementation: require("sass"),
				},
			},
		]
	};

	if (!isServer) {
		rule.use.unshift(MiniCssExtractPlugin.loader);
	}

	return rule;
};

module.exports = (isServer) => {
	return [jsRule, styleRule(isServer)];
};
