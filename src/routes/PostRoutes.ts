import { Router } from 'express';
import PostController from '../controllers/PostController';

const router = Router();

router.post('/add', PostController.addPost);
router.put('/update/:id', PostController.updatePost);
router.delete('/delete/:id', PostController.deletePost);
router.get('/all', PostController.getAllPosts);

export default router;
