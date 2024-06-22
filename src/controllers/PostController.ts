import { Request, Response } from "express";
import PostService from "../services/PostService";
import UserDataBaseService from "../services/UserDataBaseService";

class PostController {
    constructor() {}

    async addPost(req: Request, res: Response) {
        const { title, content } = req.body;

        if (!title || !content) {
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
                const newPost = await PostService.addPost({
                    title,
                    content,
                    author: { connect: { id: user.id } },
                    published: false,
                });

                return res.status(201).json({
                    status: "OK",
                    message: newPost,
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

    async updatePost(req: Request, res: Response) {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Faltou o ID",
            });
        }

        if (!title || !content) {
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
                const updatedPost = await PostService.updatePost(
                    { title, content },
                    parseInt(id)
                );

                return res.status(200).json({
                    status: "OK",
                    message: updatedPost,
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

    async deletePost(req: Request, res: Response) {
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
                const response = await PostService.deletePost(parseInt(id));

                if (response) {
                    return res.status(200).json({
                        status: "OK",
                        message: "Postagem deletada com sucesso",
                    });
                } else {
                    return res.status(404).json({
                        status: "error",
                        message: "Postagem não encontrada",
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

    async getAllPosts(req: Request, res: Response) {
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
                const posts = await PostService.getAllPosts();

                return res.status(200).json({
                    status: "OK",
                    message: posts,
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

export default new PostController();
