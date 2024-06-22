import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import comentarioRoutes from './routes/comentarioRoutes';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
