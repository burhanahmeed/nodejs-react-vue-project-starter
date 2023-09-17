import express from 'express';
import userRoutes from './users';
import authRoutes from './auth';
import fileRoutes from './files';
import errHandler from '../middlewares/errorHandler';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/files', fileRoutes);

router.use(errHandler);

export default router;
