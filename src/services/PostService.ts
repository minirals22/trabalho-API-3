import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PostService {
    async addPost(data: { title: string, content: string, author: any, published: boolean }) {
        const newPost = await prisma.post.create({
            data,
        });
        return newPost;
    }

    async updatePost(data: { title: string, content: string }, id: number) {
        const updatedPost = await prisma.post.update({
            where: { id },
            data,
        });
        return updatedPost;
    }

    async deletePost(id: number) {
        const deletedPost = await prisma.post.delete({
            where: { id },
        });
        return deletedPost;
    }

    async getAllPosts() {
        const posts = await prisma.post.findMany();
        return posts;
    }
}

export default new PostService();
