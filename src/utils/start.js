import React from 'react';
import { hydrate } from 'react-dom';
import App from '@/components/App';

export const startApp = (data) => {
	hydrate(
		<App data={{ ...data, test: 'Client side data is available too' }} />,
		document.getElementById('root')
	);
};

/**
 * @func whenDOMIsReady
 * @param {func} fn callback to run when DOM is ready
 */
export const whenDOMIsReady = (fn) => {
	if (document.readyState !== 'loading') {
		fn(window.__INITIAL_STATE__);
	} else if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', () => {
			fn(window.__INITIAL_STATE__);
		});
	} else {
		document.attachEvent('onreadystatechange', () => {
			if (document.readyState !== 'loading') {
				fn(window.__INITIAL_STATE__);
			}
		});
	}
};
