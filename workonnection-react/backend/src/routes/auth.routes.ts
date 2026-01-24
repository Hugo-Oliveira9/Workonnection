import { Router, Request, Response } from "express";
import { Usuario } from "../types/Usuario";
import { usuarios } from "../data/usuarios";

const router = Router();

//Rota cadastro
router.post("/cadastro", (req: Request, res: Response) => {
    const {nome, email, senha} = req.body as Usuario;

    if (!email || !senha){
        return res.status(400).json({erro: "Email e senha são obrigatórios."});
    }

    const jaExiste = usuarios.find(u => u.email === email);

    if (jaExiste){
        return res.status(400).json({erro: "Usuário já cadastrado com esse email."})
    }

    const novoUsuario: Usuario = {
        nome,
        email,
        senha
    };

    usuarios.push(novoUsuario);
});

//rota login
router.post("/login", (req: Request, res: Response) => {
    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(400).json({erro: "Email e senha são obrigatórios."});
    }

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
        return res.status(401).json({erro: "Usuário não encontrado."});
    }

    if (usuario.senha != senha) {
        return res.status(401).json({erro: "Senha incorreta."})
    }

    return res.json({
        mensagem: `Bem-vindo(a), ${usuario.nome || "Usuário"}!`,
        usuario: {
            nome: usuario.nome,
            email: usuario.email
        }
    });
});

export default router;