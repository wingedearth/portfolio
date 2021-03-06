import React from 'react';
import { object } from 'prop-types';

/**
 * @function App
 * @description - top level React component
 * @param {Object} data
 * @returns {React.ReactElement}
 */
const App = ({ data }) => {
	return (
		<main>
			<h1>{data?.title}</h1>
			<h3>React is now rendering page data from the server.</h3>
			<h3>{data?.test}</h3>
		</main>
	);
};

App.defaultProps = {
	data: {}
};

App.propTypes = {
	data: object
};

export default App;
