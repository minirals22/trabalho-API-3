import { Router } from 'express';
import ComentarioController from '../controllers/ComentarioController';

const router = Router();

router.post('/add', ComentarioController.addComment);
router.put('/update/:id', ComentarioController.updateComment);
router.delete('/delete/:id', ComentarioController.deleteComment);
router.get('/all', ComentarioController.getAllComments);

export default router;
