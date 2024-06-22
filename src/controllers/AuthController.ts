import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { validateHash } from "../utils/BcryptUtils";

class AuthController {
    constructor() {}

    async signIn(req: Request, res: Response) {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Faltam parâmetros",
            });
        }

        try {
            const user = await AuthService.signIn({ email, name });

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "Usuário não encontrado",
                });
            }

            const isPasswordValid = await validateHash(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    status: "error",
                    message: "Senha incorreta",
                });
            }

            return res.status(200).json({
                status: "OK",
                accessToken: user.token,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new AuthController();
