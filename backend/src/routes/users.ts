import express from 'express';
import user from '../controllers/UsersController';
import role from '../controllers/RolesController';
import { checkUser } from '../middlewares/authentication';
import { useRules } from '../middlewares/roles';
import { RULES } from '../constants/rules';

const router = express.Router();

// middleware check
router.use(checkUser);

router.get('/roles', useRules([RULES.SUPER]), role.list);
router.get('/me', user.me);
router.get('/:id', useRules([RULES.CAN_VIEW]), user.get);
router.get('/', useRules([RULES.CAN_VIEW]), user.list);

router.post('/', useRules([RULES.CAN_CREATE]), user.create);
router.post('/password', user.updatePassword);

router.put('/:id', useRules([RULES.CAN_EDIT]), user.update);
router.delete('/:id', useRules([RULES.CAN_DELETE]), user.delete);

export default router;
