import express from 'express';
import auth from '../controllers/AuthController';

const router = express.Router();

router.post('/login', auth.login);
router.post('/register', auth.signup);

export default router;
