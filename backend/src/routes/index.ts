import express from 'express';
import userRoutes from './users';
import errHandler from '../middlewares/errorHandler';

const router = express.Router();

router.use('/users', userRoutes);

router.use(errHandler);

export default router;
