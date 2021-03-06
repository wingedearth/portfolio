import serialize from 'serialize-javascript';

/**
 * @function getScriptTags
 * @description takes an array of filenames and creates a string including a script tag to import each javascript file referenced by name
 * @param {array} files - file names
 * @returns {string}
 */
export const getScriptTags = (files) => {
	if (files) {
		return files
			.map((file) => `<script type="text/javascript" src="/${file}"></script>`)
			.join('\n');
	}
	console.log('entry files not found.');
};

/**
 * @function template
 * @param {Object} data
 * @param {String} markup - from renderToString
 * @param {*} entryName
 * @returns {String} html markup
 */
const template = (data, markup, entryName) => {
	const { title } = data;

	// import manifest on every server reload
	const manifest = require('../../dist/client/manifest.json');
	const entry = manifest?.entrypoints?.[entryName];
	const scriptTags = getScriptTags(entry?.js);

	return `
	<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>${title}</title>
			</head>
			<body>
				<div id="root">${markup}</div>
				<script>window.__INITIAL_STATE__ = ${serialize(data)}</script>
				${scriptTags}
			</body>
		</html>`;
};

export default template;
