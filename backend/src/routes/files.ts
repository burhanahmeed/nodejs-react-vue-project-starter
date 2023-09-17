import express from 'express';
import file from '../controllers/FilesController';
import { checkUser } from '../middlewares/authentication';
import { useRules } from '../middlewares/roles';
import { RULES } from '../constants/rules';
import { uploaderDiskMiddleware } from '../utils/uploadFile';

const router = express.Router();

// middleware check
router.use(checkUser);

router.post('/', useRules([RULES.CAN_CREATE]), uploaderDiskMiddleware.single('image'), file.create);
router.post('/:id', useRules([RULES.CAN_CREATE, RULES.CAN_EDIT]), uploaderDiskMiddleware.single('image'), file.update);
router.get('/', file.list);
router.delete('/:id', useRules([RULES.CAN_DELETE]), file.delete);

export default router;
