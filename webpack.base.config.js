const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProd ? 'production' : 'development',
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src')
		},
		extensions: ['.js', '.json', '.jsx', '.scss'],
		modules: ['node_modules']
	},
	watchOptions: {
		ignored: /node_modules/
	}
};
