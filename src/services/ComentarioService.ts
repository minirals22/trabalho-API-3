import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ComentarioService {
    async addComment(data: { content: string, author: any, post: any }) {
        const newComment = await prisma.comment.create({
            data,
        });
        return newComment;
    }

    async updateComment(data: { content: string }, id: number) {
        const updatedComment = await prisma.comment.update({
            where: { id },
            data,
        });
        return updatedComment;
    }

    async deleteComment(id: number) {
        const deletedComment = await prisma.comment.delete({
            where: { id },
        });
        return deletedComment;
    }

    async getAllComments() {
        const comments = await prisma.comment.findMany();
        return comments;
    }
}

export default new ComentarioService();
