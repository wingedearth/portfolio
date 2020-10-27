module.exports = {
	env: {
		commonjs: true,
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'standard',
		'prettier',
		'prettier/standard',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended'
	],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			modules: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['prettier', 'react'],
	rules: {
		'no-console': 0,
		'prettier/prettier': [
			'error',
			{
				tabWidth: 4,
				useTabs: true,
				singleQuote: true,
				printWidth: 100,
				trailingComma: 'none'
			}
		],
		'comma-dangle': [2, 'never'],
		semi: [2, 'always'],
		'no-tabs': 0,
		'no-new': 1,
		'valid-jsdoc': [
			2,
			{
				requireParamDescription: false,
				requireReturnDescription: false,
				requireReturn: false
			}
		],
		'jsx-a11y/media-has-caption': 0
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
