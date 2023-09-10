import express from 'express';
import user from '../controllers/UsersController';
import role from '../controllers/RolesController';
import { checkUser } from '../middlewares/authentication';
import { checkAdmin } from '../middlewares/roles';

const router = express.Router();

router.post('/auth', user.auth);

// middleware check
router.use(checkUser);
router.use(checkAdmin);

router.get('/roles', role.list);
router.get('/me', user.me);
router.get('/:id', user.get);
router.get('/', user.list);

router.post('/', user.create);
router.post('/password', user.updatePassword);

router.put('/:id', user.update);

export default router;
