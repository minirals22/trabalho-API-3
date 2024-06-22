import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/add', UserController.addUser);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);
router.get('/all', UserController.getAllUsers);

export default router;
