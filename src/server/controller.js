import React from 'react';
import { renderToString } from 'react-dom/server';
import template from '@/server/template';
import App from '@/components/App';

const title = 'Portfolio';

/**
 * @function Controller
 * @requires Express
 * @param {Object} req - request
 * @param {Object} res - response
 */
const Controller = (req, res) => {
	const data = {
		params: {
			...req.params,
			...req.query
		},
		title
	};

	// render App
	const markup = renderToString(<App data={data} />);
	const page = template(data, markup);

	res.send(page);
};

export default Controller;
