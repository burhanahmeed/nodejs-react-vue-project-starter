import express from 'express';
import auth from '../controllers/AuthController';

const router = express.Router();

router.post('/login', auth.login);
router.post('/register', auth.signup);
router.post('/forgot-password', auth.sendForgotPassword);
router.post('/reset-password', auth.resetPassword);

export default router;
