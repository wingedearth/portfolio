const path = require('path');

module.exports = (NODE_ENV) => {
	const isProd = NODE_ENV === 'production';

	return {
		devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
		mode: isProd ? 'production' : 'development',
		resolve: {
			alias: {
				'@': path.join(__dirname, 'src'),
				process: 'process/browser'
			},
			extensions: ['.js', '.json', '.jsx', '.scss'],
			modules: ['node_modules']
		},
		watchOptions: {
			ignored: /node_modules/
		}
	}
};
