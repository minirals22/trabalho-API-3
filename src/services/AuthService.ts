import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AuthService {
    async signIn(data: { email: string, name: string }) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        return user;
    }
}

export default new AuthService();
