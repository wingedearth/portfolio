const path = require('path');
const babelConfigFile = path.join(__dirname, '..', 'babel.config.json');

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

module.exports = () => {
	return [jsRule];
};
