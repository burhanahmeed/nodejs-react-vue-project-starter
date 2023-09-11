import express from 'express';
import userRoutes from './users';
import authRoutes from './auth';
import errHandler from '../middlewares/errorHandler';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.use(errHandler);

export default router;
