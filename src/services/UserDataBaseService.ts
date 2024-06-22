import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserDataBaseService {
    async addUser(data: { name: string, email: string, password: string }) {
        const newUser = await prisma.user.create({
            data,
        });
        return newUser;
    }

    async updateUser(data: { name: string, email: string, password: string }, id: number) {
        const updatedUser = await prisma.user.update({
            where: { id },
            data,
        });
        return updatedUser;
    }

    async deleteUser(id: number) {
        const deletedUser = await prisma.user.delete({
            where: { id },
        });
        return deletedUser;
    }

    async getAllUsers() {
        const users = await prisma.user.findMany();
        return users;
    }

    async getUserByToken(token: string) {
        const user = await prisma.user.findUnique({
            where: { token },
        });
        return user;
    }
}

export default new UserDataBaseService();
