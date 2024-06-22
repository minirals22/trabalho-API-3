import { Request, Response } from "express";
import ComentarioService from "../services/ComentarioService";
import PostService from "../services/PostService";
import UserDataBaseService from "../services/UserDataBaseService";

class ComentarioController {
    constructor() {}

    async addComment(req: Request, res: Response) {
        const { idPostagem, content } = req.body;

        if (!idPostagem) {
            const posts = await PostService.getAllPosts();
            return res.status(400).json({
                status: "error",
                message: "Faltou informar o ID da postagem.",
                posts,
            });
        }

        if (!content) {
            return res.status(400).json({
                status: "error",
                message: "Faltam parâmetros",
            });
        }

        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    status: "error",
                    message: "Faltou fornecer o token",
                });
            }

            const user = await UserDataBaseService.getUserByToken(token);

            if (user) {
                const newComment = await ComentarioService.addComment({
                    content,
                    author: { connect: { id: user.id } },
                    post: { connect: { id: idPostagem } },
                });

                return res.status(201).json({
                    status: "OK",
                    message: newComment,
                });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: 'Token inválido',
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async updateComment(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Faltou o ID",
            });
        }

        if (!content) {
            return res.status(400).json({
                status: "error",
                message: "Faltam parâmetros",
            });
        }

        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    status: "error",
                    message: "Faltou fornecer o token",
                });
            }

            const user = await UserDataBaseService.getUserByToken(token);

            if (user) {
                const updatedComment = await ComentarioService.updateComment({ content }, parseInt(id));

                return res.status(200).json({
                    status: "OK",
                    message: updatedComment,
                });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: 'Token inválido',
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async deleteComment(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Faltou o ID",
            });
        }

        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    status: "error",
                    message: "Faltou fornecer o token",
                });
            }

            const user = await UserDataBaseService.getUserByToken(token);

            if (user) {
                const response = await ComentarioService.deleteComment(parseInt(id));
                if (response) {
                    return res.status(200).json({
                        status: "OK",
                        message: "Comentário deletado com sucesso",
                    });
                } else {
                    return res.status(404).json({
                        status: "error",
                        message: "Comentário não encontrado",
                    });
                }
            } else {
                return res.status(401).json({
                    status: "error",
                    message: 'Token inválido',
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getAllComments(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    status: "error",
                    message: "Faltou fornecer o token",
                });
            }

            const user = await UserDataBaseService.getUserByToken(token);

            if (user) {
                const comments = await ComentarioService.getAllComments();

                return res.status(200).json({
                    status: "OK",
                    message: comments,
                });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: 'Token inválido',
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new ComentarioController();
