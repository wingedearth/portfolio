import packageJson from '../../../package.json';
import { NODE_ENV } from '@/constants';

/**
 * @function VersionController
 * @requires Express
 * @param {Object} req - request
 * @param {Object} res - response
 */
const VersionController = (req, res) => {
	const data = {
		name: packageJson?.name,
		version: packageJson?.version,
		environment: NODE_ENV
	};

	res.json(data);
};

export default VersionController;
