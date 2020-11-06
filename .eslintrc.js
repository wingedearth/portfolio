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
		'valid-jsdoc': [
			1,
			{
				requireParamDescription: false,
				requireReturnDescription: false,
				requireReturn: false,
				returns: true
			}
		]
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
