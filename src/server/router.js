import express from 'express';
import Controller from './controllers/controller';
import VersionController from './controllers/version-controller';

const router = express.Router();

router.get('/version', VersionController);
router.get('/', Controller);

export default router;
