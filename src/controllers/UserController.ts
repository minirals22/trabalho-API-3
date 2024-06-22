import { Request, Response } from "express";
import UserDataBaseService from "../services/UserDataBaseService";

class UserController {
    constructor() {}

    async addUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Faltam parâmetros",
            });
        }

        try {
            const user = await UserDataBaseService.addUser({
                name,
                email,
                password,
            });

            return res.status(201).json({
                status: "OK",
                message: user,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Faltou o ID",
            });
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Faltam parâmetros",
            });
        }

        try {
            const updatedUser = await UserDataBaseService.updateUser(
                { name, email, password },
                parseInt(id)
            );

            return res.status(200).json({
                status: "OK",
                message: updatedUser,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Faltou o ID",
            });
        }

        try {
            const response = await UserDataBaseService.deleteUser(parseInt(id));

            if (response) {
                return res.status(200).json({
                    status: "OK",
                    message: "Usuário deletado com sucesso",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    message: "Usuário não encontrado",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserDataBaseService.getAllUsers();

            return res.status(200).json({
                status: "OK",
                message: users,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new UserController();
